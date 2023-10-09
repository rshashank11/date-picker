import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns"
import React, { useState } from "react"

const DatePickerModal = ({ dateValue, setDate }) => {
  const [visibleMonth, setVisibleMonth] = useState(dateValue || new Date())
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)), //startOfWeek gets the first day(A sunday basically) of the week of the particular date entered. Example: For September 1 2023, the startOfWeek would be August 27 2023 which is a Sunday and will be visible on the calender.

    end: endOfWeek(endOfMonth(visibleMonth)), //startOfMonth as it says, gives the first day of the month of the entered date.
  })
  const showPreviousMonth = () => {
    setVisibleMonth((currentMonth) => addMonths(currentMonth, -1))
  }
  const showNextMonth = () => {
    setVisibleMonth((currentMonth) => addMonths(currentMonth, 1))
  }
  return (
    <div className="date-picker">
      <div className="date-picker-header">
        <button
          className="prev-month-button month-button"
          onClick={showPreviousMonth}
        >
          &larr;
        </button>
        <div className="current-month">{format(visibleMonth, "MMMM yyyy")}</div>
        <button
          className="next-month-button month-button"
          onClick={showNextMonth}
        >
          &rarr;
        </button>
      </div>
      <div className="date-picker-grid-header date-picker-grid">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="date-picker-grid-dates date-picker-grid">
        {visibleDates.map((date) => {
          return (
            <button
              onClick={() => setDate(date)}
              className={`date ${
                !isSameMonth(date, visibleMonth) &&
                "date-picker-other-month-date"
              } ${isSameDay(date, dateValue) && "selected"}
              ${isToday(date) && "today"}`}
              key={date.toDateString()}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DatePickerModal
