import useAttendanceContext from "@/hooks/useAttendanceContext"
import { Button } from "./ui/button"
import useHandleCheckInOut from "@/hooks/useHandleCheckInOut"

export default function CheckInOutAction() {
  const { attendances } = useAttendanceContext()
  const { handleCheckIn, handleCheckOut, shouldCheckOutButtonRender } =
    useHandleCheckInOut()

  if (attendances.isLoading) return null

  return (
    <div className='flex items-center justify-center gap-4 py-10'>
      {shouldCheckOutButtonRender === false && (
        <Button onClick={handleCheckIn}>Check In</Button>
      )}
      {shouldCheckOutButtonRender && (
        <Button onClick={handleCheckOut}>Check Out</Button>
      )}
    </div>
  )
}
