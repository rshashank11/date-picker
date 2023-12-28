import React, { useState } from "react"
import DatePickerModal from "./DatePickerModal"
// import { format } from "date-fns"
import NewDatePickerModal from "./NewDatePickerModal"

const DatePicker = () => {
  const [date, setDate] = useState(new Date())
  return (
    <div className="bg-white rounded py-4 h-[420px]">
      <NewDatePickerModal dateValue={date} setDateValue={setDate} />
    </div>
  )
}

export default DatePicker
