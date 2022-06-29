import React, { useState } from "react";
import CalendarEvents from "./Calendar/Calendar";
import Recommended from "./recomended/Recommended";
import Search from "./search/Search";
import { apiAPI } from "../../api/api";

export default function HomePage() {
  const handleSearch = async (searchObj) => {
    console.log(searchObj);
    try {
      const { data } = await apiAPI.post("/holydays", searchObj);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <CalendarEvents />
      <Recommended />
    </div>
  );
}
