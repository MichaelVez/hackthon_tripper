import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Spinner from "../../../components/Spinner/Spinner";
import { useTranslation } from "react-i18next";
import { apiAPI } from "../../../api/api";
import "./Calendar.css";
import { translateEvents } from "../../../utils/utils";
import i18next from "i18next";
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

function CalendarEvents({
  events,
  spinner,
  checkInDate,
  countryName,
  setSpinnerUp,
  flag,
}) {
  let navigate = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
  const [date, setDate] = useState(initialDate);

  // Click Event/Holiday
  const handleClickEvent = async (event) => {
    const obj = {
      countryName: event.countryName,
      eventId: event.eventID,
      eventLink: event.link,
    };
    setSpinnerUp(true);
    const { data } = await apiAPI.post("/events", obj);
    if (!data || data.error) return setSpinnerUp(false);
    setSpinnerUp(false);

    console.log(data);
    navigate(`/event`, {
      state: { ...data, countryName: event.countryName, flag },
    });
  };

  // Choose Date
  useEffect(() => {
    setDate(checkInDate);
  }, [checkInDate]);

  useEffect(() => {
    const eventsFormatCalendar = events.map((event) => {
      return {
        title: event.name,
        link: event.link,
        start: new Date(event.date),
        end: new Date(event.date),
        countryName: countryName,
        eventID: event._id,
      };
    });
    if (eventsFormatCalendar.length > 0) {
      const translate = async () => {
        const response = await translateEvents(
          eventsFormatCalendar,
          i18next.language
        );
        setAllEvents(response);
      };
      translate();
    }
  }, [events, i18next.language]);
  const { t } = useTranslation();

  return (
    <div className="calender-container">
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
