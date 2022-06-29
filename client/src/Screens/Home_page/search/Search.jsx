import React from "react";
import "./search.css";

export default function Search() {
  return (
    <div className="search-container">
      <SearchInput searchTerm={"Country"} />
      <SearchInput searchTerm={"Date"} check={"Check In:  "} />
      <SearchInput searchTerm={"Date"} check={"Check Out:  "} />
    </div>
  );
}

function SearchInput({ searchTerm, check }) {
  const type = searchTerm === "Country" ? "text" : "date";

  return (
    <div className="ui category search">
      <div className="ui icon input date-container">
        {searchTerm === "Date" && <label>{check}</label>}
        <input type={type} placeholder={`Search ${searchTerm}...`} />
        <i className="search icon"></i>
      </div>
      <div class="results"></div>
    </div>
  );
}
