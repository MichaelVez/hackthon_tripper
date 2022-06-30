import React, { useEffect, useState } from "react";
import CalendarEvents from "./Calendar/Calendar";
import Recommended from "./recomended/Recommended";
import Search from "./search/Search";
import { apiAPI } from "../../api/api";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [countryName, setCountryName] = useState("");
  const [flag, setFlag] = useState("");

  const setSpinnerUp = (state) => {
    setSpinner(state);
  };

  const handleSearch = async (searchObj) => {
    // console.log(searchObj);
    setCheckInDate(searchObj.checkin);
    setCountryName(searchObj.country);
    try {
      setSpinner(true);
      const { data } = await apiAPI.post("/holydays", searchObj);

      setSpinner(false);
      // console.log(data);
      setFlag(data.flag);
      setSpinner(false);
      // console.log(data);
      data.events.shift();
      setEvents(data.events);
    } catch (error) {
      return error.message;
    }
  };

  return (
    <div>
      <Search handleSearch={handleSearch} flag={flag} />
      <CalendarEvents
        flag={flag}
        countryName={countryName}
        checkInDate={checkInDate}
        spinner={spinner}
        events={events}
        setSpinnerUp={setSpinnerUp}
      />
      {/* <Recommended /> */}
    </div>
  );
}
