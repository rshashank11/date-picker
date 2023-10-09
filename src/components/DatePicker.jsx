import React, { useState } from "react"
import DatePickerModal from "./DatePickerModal"
import { format } from "date-fns"

const DatePicker = () => {
  const [showDate, setShowDate] = useState(false)
  const [date, setDate] = useState(new Date())
  return (
    <div className="date-picker-container">
      <button
        onClick={() => setShowDate((sd) => !sd)}
        className="date-picker-button"
      >
        {date == null ? "Select a date" : format(date, "MMM do, yyyy")}
      </button>
      {showDate && <DatePickerModal dateValue={date} setDate={setDate} />}
    </div>
  )
}

export default DatePicker
