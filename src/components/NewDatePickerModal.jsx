import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns"
import React, { useState } from "react"

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const NewDatePickerModal = ({ dateValue, setDateValue }) => {
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
    <div className="pt-16">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-500">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(visibleMonth, "MMMM yyyy")}
              </h2>
              <button
                type="button"
                onClick={showPreviousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                &larr;
              </button>
              <button
                onClick={showNextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                &rarr;
              </button>
            </div>
            <div className="grid grid-cols-7 gap-3 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-3 mt-2 text-sm">
              {visibleDates.map((date, dateIndex) => (
                <div
                  key={date.toString()}
                  className={classNames(
                    dateIndex === 0 && colStartClasses[getDay(date)],
                    "py-1.5"
                  )}
                >
                  <button
                    type="button"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewDatePickerModal
