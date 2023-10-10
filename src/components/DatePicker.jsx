import React, { useState } from "react"
import DatePickerModal from "./DatePickerModal"
// import { format } from "date-fns"
import NewDatePickerModal from "./NewDatePickerModal"

const DatePicker = () => {
  const [date, setDate] = useState(new Date())
  return <NewDatePickerModal dateValue={date} setDateValue={setDate} />
}

export default DatePicker
