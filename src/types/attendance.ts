export type AttendanceT = {
  id: number
  check_in?: string
  break_in?: string
  break_out?: string
  check_out?: string
  shift: Shift
  evaluation: Evaluation
}

type Evaluation = {
  shift_start: string
  shift_end: string
}

type Shift = {
  id: number
  name: string
  start_time: string
  end_time: string
  break_duration: number
  late_grace_period: number
  early_leave_grace_period: number
  created_at: string
  updated_at: string
}
