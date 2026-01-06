import { type AttendanceT } from "../types/attendance"
import attendances from "../mock-data/attendance-list.json"
import { DateService } from "./date.service"
import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  getHours,
  parseJSON,
} from "date-fns"

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
      const workedTime =
        new Date(check_out).getTime() -
        new Date(check_in).getTime() -
        break_duration

      console.log(parseJSON(check_in))
      console.log(parseJSON(check_out))

      const hours = differenceInHours(parseJSON(check_out), parseJSON(check_in))
      const minutes = differenceInMinutes(parseJSON(check_out), parseJSON(check_in))
      const seconds = differenceInSeconds(parseJSON(check_out), parseJSON(check_in))

      console.log({
        hours,
        minutes,
        seconds,
      })
      return `${hours}:${minutes}:${seconds}`
    }
    return "00:00:00"
  }
}

export const AttendanceService = new AttendanceServiceClass()
