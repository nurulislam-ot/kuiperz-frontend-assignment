import { format, parseJSON } from "date-fns"

class DateServiceClass {
  formatAttendanceDate(date?: string) {
    if (date) return format(parseJSON(date), "dd, MMM, yyyy")
  }

  formatCheckInAndOutTime(date?: string) {
    if(date) return format(parseJSON(date), "KK:mm:ss a")
  }

  formatWorkedTime(workedTime: number) {
    return format(workedTime, "KK:mm:ss")
  }

  isSameDay() {
    
  }
}

export const DateService = new DateServiceClass()
