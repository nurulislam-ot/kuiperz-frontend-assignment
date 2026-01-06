import { useContext } from "react"
import { AttendanceContext } from "@/context/attendance-context"

export default function useAttendanceContext() {
  return useContext(AttendanceContext)
}
