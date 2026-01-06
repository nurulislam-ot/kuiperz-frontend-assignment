import { useEffect } from "react"
import useAttendanceContext from "./useAttendanceContext"
import { AttendanceService } from "../services/attendance.service"

export default function useGetAttendances() {
  const { attendances, dispatch } = useAttendanceContext()

  useEffect(() => {
    const response = AttendanceService.getAttendanceList()
    response.then((data) => {
      dispatch({
        type: "FETCH",
        payload: {
          data,
        },
      })
    })
  }, [dispatch])

  return {
    attendances,
    isLoading: attendances.isLoading,
  }
}
