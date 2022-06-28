import React from "react";
import CalendarEvents from "./Calendar/Calendar";
import Recommended from "./recomended/Recommended";
import Search from "./search/Search";

export default function HomePage() {
  return (
    <div>
      <Search />
      <CalendarEvents />
      <Recommended />
    </div>
  );
}
