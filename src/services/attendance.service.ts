import { intervalToDuration } from "date-fns"
import { type AttendanceT } from "../types/attendance"
import attendances from "../mock-data/attendance-list.json"

class AttendanceServiceClass {
  async getAttendanceList() {
    return new Promise<AttendanceT[]>((resolve) => {
      const data = attendances
      setTimeout(() => {
        resolve(data as AttendanceT[])
      }, 2000)
    })
  }

  async handleCheckIn() {}

  async handleCheckOut() {}

  getAttendanceStatus({
    check_in,
    check_out,
    late_grace_period,
    shift_start_time,
    shift_end_time,
    early_leave_grace_period,
  }: {
    check_in?: string
    check_out?: string
    shift_start_time: string
    late_grace_period: number
    shift_end_time: string
    early_leave_grace_period: number
  }) {
    if (check_in) {
      const isLate =
        new Date(check_in).getTime() >
        new Date(shift_start_time).getTime() + late_grace_period

      if (isLate) {
        return "Late"
      }

      return "On Time"
    }

    if (check_out) {
      const earlyLeave =
        new Date(check_out).getTime() <
        new Date(shift_end_time).getTime() - early_leave_grace_period

      if (earlyLeave) {
        return "Early Leave"
      }
    }
    return "Absent"
  }

  getWorkedTime({
    break_duration,
    check_in,
    check_out,
  }: {
    break_duration: number
    check_in?: string
    check_out?: string
  }) {
    if (check_in && check_out) {
      const {
        hours = 0,
        minutes = 0,
        seconds = 0,
      } = intervalToDuration({
        start: check_in,
        end: new Date(check_out).getTime() - break_duration,
      })

      const format = (n: number) => String(n).padStart(2, "0")

      const diff = `${format(hours)}:${format(minutes)}:${format(seconds)}`

      return diff
    }
    return "00:00:00"
  }
}

export const AttendanceService = new AttendanceServiceClass()
