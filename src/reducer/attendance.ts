import type { AttendanceT } from "@/types/attendance"
import { isSameDay } from "date-fns"

export type ACTIONS =
  | {
      type: "FETCH"
      payload: {
        data: AttendanceT[]
      }
    }
  | {
      type: "CHECK_IN"
      payload: {
        time: string
      }
    }
  | {
      type: "CHECK_OUT"
      payload: {
        time: string
      }
    }

export type ReducerData = {
  data: AttendanceT[]
  isLoading: boolean
}

export const attendanceReducer = (
  prevState: {
    data: AttendanceT[]
    isLoading: boolean
  },
  action: ACTIONS
): ReducerData => {
  switch (action.type) {
    case "FETCH":
      return {
        data: action.payload.data,
        isLoading: false,
      }

    case "CHECK_IN": {
      const shift_start = new Date(action.payload.time)
      shift_start.setHours(9)
      const shift_end = new Date(action.payload.time)
      shift_end.setHours(17)

      return {
        ...prevState,
        data: [
          ...prevState.data,
          {
            id: 23,
            check_in: action.payload.time,
            shift: {
              id: 1,
              name: "Morning",
              start_time: "09:00:00",
              end_time: "17:00:00",
              break_duration: 1,
              late_grace_period: 2,
              early_leave_grace_period: 2,
              created_at: action.payload.time,
              updated_at: action.payload.time,
            },
            evaluation: {
              shift_start: shift_start.toJSON(),
              shift_end: shift_end.toJSON(),
            },
          },
        ],
      }
    }

    case "CHECK_OUT": {
      return {
        ...prevState,
        data: prevState.data.map((attendance) => {
          if (
            attendance.check_in &&
            isSameDay(attendance.check_in, action.payload.time)
          ) {
            return { ...attendance, check_out: action.payload.time }
          }
          return attendance
        }),
      }
    }
    default:
      return prevState
  }
}
