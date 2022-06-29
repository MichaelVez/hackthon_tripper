import React from "react";
import "./search.css";
import { useTranslation } from "react-i18next";

export default function Search() {
  const { t } = useTranslation();
  return (
    <div className="search-container">
      <SearchInput searchTerm={"Country"} />
      <SearchInput searchTerm={"Date"} check={t("Checkin.1")} />
      <SearchInput searchTerm={"Date"} check={t("Checkout.1")} />
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
