import AttendanceRow from "./attendance-row"
import useGetAttendances from "@/hooks/useGetAttendances"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table"

export default function AttendanceListView() {
  const { attendances, isLoading } = useGetAttendances()
  if (isLoading) return <h3>Loading...</h3>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Shift Name</TableHead>
          <TableHead>Check In</TableHead>
          <TableHead>Check Out</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Worked Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendances.data.map((attendance) => (
          <AttendanceRow key={attendance.id} {...attendance} />
        ))}
      </TableBody>
    </Table>
  )
}
