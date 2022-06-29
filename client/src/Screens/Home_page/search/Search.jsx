import React, { useEffect, useState } from "react";
import "./search.css";
import { useTranslation } from "react-i18next";

export default function Search({ handleSearch, flag }) {
  const { t } = useTranslation();
  const [searchObj, setSearchObj] = useState({
    country: "",
    checkin: "",
    checkout: "",
  });
  const [isErrorSearch, setErrorSearch] = useState(false);

  const inputValue = (fromUser, id) => {
    // console.log(fromUser, id);
    setSearchObj((prev) => {
      return { ...prev, [id]: fromUser };
    });
    // console.log(searchObj);
  };

  const handleClickSearch = () => {
    // console.log(searchObj);
    // * Validate if all input
    for (const key in searchObj) {
      // console.log(searchObj[key] === "");
      if (searchObj[key] === "") {
        setErrorSearch(true);
        setTimeout(() => {
          setErrorSearch(false);
        }, 2000);
        return;
      }
    }
    handleSearch(searchObj);
  };

  return (
    <div className="searchBar">
      <div className="ui secondary pointing menu">
        <li className="item">
          <SearchInput id={"country"} searchTerm={"Country"} inputValue={inputValue} />
        </li>
        {flag && (
          <li className="item" style={{ position: "relative", top: "-0.5rem" }}>
            <img src={flag} alt="" />
          </li>
        )}
        <li className="item">
          <SearchInput id={"checkin"} searchTerm={"Date"} check={t("Checkin.1")} inputValue={inputValue} />
        </li>
        <li className="item">
          <SearchInput id={"checkout"} searchTerm={"Date"} check={t("Checkout.1")} inputValue={inputValue} />
        </li>
        <li className="item">
          <div className="ui category search">
            <button className="ui secondary button find-events" onClick={handleClickSearch}>
              {t("findevent.1")}
            </button>
            {isErrorSearch && <div className="error-search-message">Please fill all search field</div>}
          </div>
        </li>
      </div>
    </div>
  );
}

function SearchInput({ searchTerm, check, inputValue, id }) {
  const type = searchTerm === "Country" ? "text" : "date";
  const [value, setValue] = useState("");

  const onChange = ({ target: { value, id } }) => {
    setValue(value);

    inputValue(value.toLowerCase(), id);
  };

  const { t } = useTranslation();
  return (
    <div className="ui category search">
      <div className="ui icon input date-container">
        {searchTerm === "Date" && <label>{check}</label>}
        <input id={id} type={type} placeholder={`${t("search.1")}`} value={value} onChange={onChange} />
        {searchTerm !== "Date" && <i className="search icon"></i>}
      </div>
      <div className="results"></div>
    </div>
  );
}
