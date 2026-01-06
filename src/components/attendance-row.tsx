import type { AttendanceT } from "@/types/attendance"
import { TableCell, TableRow } from "./ui/table"
import { DateService } from "@/services/date.service"
import { AttendanceService } from "@/services/attendance.service"

export default function AttendanceRow(attendance: AttendanceT) {
  return (
    <TableRow>
      <TableCell>
        {DateService.formatAttendanceDate(attendance.shift.created_at)}
      </TableCell>
      <TableCell>{attendance.shift.name}</TableCell>
      <TableCell>
        {DateService.formatCheckInAndOutTime(attendance.check_in)}
      </TableCell>
      <TableCell>
        {DateService.formatCheckInAndOutTime(attendance.check_out)}
      </TableCell>
      <TableCell>
        {AttendanceService.getAttendanceStatus({
          late_grace_period: attendance.shift.late_grace_period,
          shift_start_time: attendance.evaluation.shift_start,
          check_in: attendance.check_in,
          early_leave_grace_period: attendance.shift.early_leave_grace_period,
          shift_end_time: attendance.evaluation.shift_end,
          check_out: attendance.check_out,
        })}
      </TableCell>
      <TableCell>
        {AttendanceService.getWorkedTime({
          break_duration: attendance.shift.break_duration,
          check_in: attendance.check_in,
          check_out: attendance.check_out,
        })}
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  )
}
