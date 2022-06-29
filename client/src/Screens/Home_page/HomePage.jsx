import React, { useState } from "react";
import CalendarEvents from "./Calendar/Calendar";
import Recommended from "./recomended/Recommended";
import Search from "./search/Search";

export default function HomePage() {
  const [ events, setEvents ] = useState([]);

  const setEventesUp = (events) => {
    setEvents(events);
  }

  return (
    <div>
      <Search setEventesUp={setEventesUp} />
      <CalendarEvents events={events} />
      <Recommended />
    </div>
  );
}
