import { useReducer } from "react"

import { attendanceReducer } from "./reducer/attendance"
import CheckInOutAction from "./components/check-in-out-action"
import { AttendanceContext } from "./context/attendance-context"
import AttendanceListView from "./components/attendance-list-view"

function App() {
  const [attendances, dispatch] = useReducer(attendanceReducer, {
    data: [],
    isLoading: true,
  })

  return (
    <div className='container mx-auto'>
      <AttendanceContext.Provider value={{ attendances, dispatch }}>
        <CheckInOutAction />
        <AttendanceListView />
      </AttendanceContext.Provider>
    </div>
  )
}

export default App
