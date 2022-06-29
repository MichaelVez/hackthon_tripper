import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Spinner from "../../../components/Spinner/Spinner";
import "moment/locale/fr";
import { useTranslation } from "react-i18next";
import "./Calendar.css";

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

function CalendarEvents({ events, spinner }) {
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
  const { t } = useTranslation();

  return (
    <div className="calender-container">
      <div className="calender-change-date">
        <input type="month" value={date} onChange={handleChangeDate} />
      </div>
      <div className="calender-main">
        {spinner ? (
          <Spinner />
        ) : (
          <Calendar
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            date={date}
            onNavigate={(date) => {
              setDate(date);
            }}
            messages={{
              next: `${t("Toolbar.next")}`,
              previous: `${t("Toolbar.back")}`,
              today: `${t("Toolbar.today")}`,
              month: `${t("Toolbar.month")}`,
              week: `${t("Toolbar.week")}`,
              day: `${t("Toolbar.day")}`,
              agenda: `${t("Toolbar.agenda")}`,
            }}
            onSelectEvent={handleClickEvent}
          />
        )}
      </div>
    </div>
  );
}

export default CalendarEvents;
