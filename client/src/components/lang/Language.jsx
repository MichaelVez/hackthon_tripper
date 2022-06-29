import React from "react";
import "./language.css";
import i18next from "i18next";

function handleClick(lang) {
  i18next.changeLanguage(lang);
}
export default function Language() {
  return (
    <div className="language">
      <button onClick={() => handleClick("he")}>עברית</button>
      <button onClick={() => handleClick("en")}>English</button>
      <button onClick={() => handleClick("ar")}>عربيه</button>
      <button onClick={() => handleClick("ru")}>Русский</button>
      <button onClick={() => handleClick("es")}>español</button>
    </div>
  );
}
