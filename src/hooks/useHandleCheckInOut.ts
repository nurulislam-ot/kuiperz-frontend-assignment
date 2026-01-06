import { isSameDay } from "date-fns"
import useAttendanceContext from "./useAttendanceContext"

export default function useHandleCheckInOut() {
  const { dispatch, attendances } = useAttendanceContext()

  const handleCheckIn = () => {
    dispatch({
      type: "CHECK_IN",
      payload: {
        time: new Date().toJSON(),
      },
    })
  }

  const handleCheckOut = () => {
    dispatch({
      type: "CHECK_OUT",
      payload: {
        time: new Date().toJSON(),
      },
    })
  }

  const shouldCheckOutButtonRender = attendances.data.reduce((prev, acc) => {
    if (acc.check_in && isSameDay(new Date(), acc.check_in)) return true
    return prev
  }, false)

  return {
    handleCheckIn,
    handleCheckOut,
    shouldCheckOutButtonRender,
  }
}
