import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

import "./Calendar.css";
import RBCToolbar from "./toolbar/toolbar";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Test Holiday 1 Brazil",
    start: new Date(2022, 6, 1),
    end: new Date(2022, 6, 3),
    link: "http://something.com",
  },
  {
    title: "Test Holiday 2 Brazil",
    start: new Date(2022, 6, 12),
    end: new Date(2022, 6, 13),
  },
  {
    title: "Test Holiday 3 Brazil",
    start: new Date(2022, 7, 12),
    end: new Date(2022, 7, 20),
  },
];

const initialDate = `${new Date().getFullYear().toString()}-0${(
  new Date().getMonth() + 1
).toString()}`;

function CalendarEvents() {
  const [allEvents, setAllEvents] = useState(events);
  const [date, setDate] = useState(initialDate);

  // Click Event/Holiday
  const handleClickEvent = (event) => {
    console.log(event);
  };

  // Choose Date
  const handleChangeDate = ({ target: { value } }) => {
    setDate(value);
  };

  return (
    <div className="calender-container">
      <div className="calender-change-date">
        <input type="month" value={date} onChange={handleChangeDate} />
      </div>
      <div className="calender-main">
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          date={date}
          onNavigate={(date) => {
            setDate(date);
          }}
          components={{
            toolbar: RBCToolbar,
          }}
          onSelectEvent={handleClickEvent}
        />
      </div>
    </div>
  );
}

export default CalendarEvents;
