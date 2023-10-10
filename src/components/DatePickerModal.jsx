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

const DatePickerModal = ({ dateValue, setDateValue }) => {
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
    <div className="date-picker absolute mt-4 top-full translate-x-[-50%] left-1/2 p-2 rounded-lg bg-white shadow-lg">
      <div>Hello</div>
      <div className="date-picker-header flex justify-between font-bold text-xs items-center">
        <div className="current-month">{format(visibleMonth, "MMMM yyyy")}</div>
        <button
          className="prev-month-button month-button bg-white border-0 cursor-pointer hover:shadow-[0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)] hover:rounded-lg"
          onClick={showPreviousMonth}
        >
          &larr;
        </button>
        <button
          className="next-month-button month-button bg-white border-0 cursor-pointer hover:shadow-[0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)] hover:rounded-lg"
          onClick={showNextMonth}
        >
          &rarr;
        </button>
      </div>
      <div className="date-picker-grid-header font-bold text-xs text-[#333] date-picker-grid grid gap-2 grid-cols-[repeat(7,2rem)] auto-rows-[2rem]">
        <div className="flex justify-center items-center w-full h-full">
          Sun
        </div>
        <div className="flex justify-center items-center w-full h-full">
          Mon
        </div>
        <div className="flex justify-center items-center w-full h-full">
          Tue
        </div>
        <div className="flex justify-center items-center w-full h-full">
          Wed
        </div>
        <div className="flex justify-center items-center w-full h-full">
          Thu
        </div>
        <div className="flex justify-center items-center w-full h-full">
          Fri
        </div>
        <div className="flex justify-center items-center w-full h-full">
          Sat
        </div>
      </div>
      <div className="date-picker-grid-dates text-[#555] date-picker-grid grid gap-2 grid-cols-[repeat(7,2rem)]  auto-rows-[2rem] ">
        {visibleDates.map((date) => {
          return (
            <button
              onClick={() => setDateValue(date)}
              className={`hover:bg-black hover:text-white cursor-pointer rounded-[50%] p-1 border-0 bg-white  ${
                !isSameMonth(date, visibleMonth) &&
                "date-picker-other-month-date text-[#aaa]"
              } ${isSameDay(date, dateValue) && ` text-white bg-black`}
              ${
                isToday(date) && "border-[1px] border-solid border-black"
              } flex justify-center items-center w-full h-full`}
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
