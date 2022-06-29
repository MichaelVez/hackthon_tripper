import React from "react";
import Calender from "./calender/Calender";
import Recommended from "./recomended/Recommended";
import Search from "./search/Search";

export default function Homepage() {
  return (
    <div>
      <Search />

      <Calender />
      <Recommended />
    </div>
  );
}
