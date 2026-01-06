import { createContext, type ActionDispatch } from "react"
import type { ACTIONS, ReducerData } from "@/reducer/attendance"

export const AttendanceContext = createContext<{
  attendances: ReducerData
  dispatch: ActionDispatch<[action: ACTIONS]>
}>(null!)
