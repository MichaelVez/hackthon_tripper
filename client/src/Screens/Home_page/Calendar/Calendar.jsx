import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import RBCToolbar from "./toolbar/toolbar";
import { useNavigate } from "react-router-dom";

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

const initialDate = `${new Date().getFullYear().toString()}-0${(
  new Date().getMonth() + 1
).toString()}`;

function CalendarEvents({ events }) {
  let navigate = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
  const [date, setDate] = useState(initialDate);

  // Click Event/Holiday
  const handleClickEvent = (event) => {
    console.log(event);
    navigate("/event", { state: { event } });
  };

  // Choose Date
  const handleChangeDate = ({ target: { value } }) => {
    setDate(value);
  };

  useEffect(() => {
    const eventsFormatCalendar = events.map((event) => {
      return {
        title: event.name,
        link: "benny",
        start: new Date(event.date),
        end: new Date(event.date),
      };
    });
    console.log(eventsFormatCalendar);
    setAllEvents(eventsFormatCalendar);
  }, [events]);

  return (
    <div className='calender-container'>
      {/* <div className="calender-change-date">
        <input type="month" value={date} onChange={handleChangeDate} />
      </div> */}
      <div className='calender-main'>
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor='start'
          endAccessor='end'
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
