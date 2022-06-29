import React from "react";
import { Dropdown } from "semantic-ui-react";
import "./LanguageSelect.css";
import i18next from "i18next";
const languageOptions = [
  { key: "عربيه", text: "عربيه", value: "ar" },
  { key: "עברית", text: "עברית", value: "he" },
  { key: "English", text: "English", value: "en" },
  { key: "Русский", text: "Русский", value: "ru" },
  { key: "español", text: "español", value: "es" },
];

const DropdownExampleSearchDropdown = () => {
  const handleChangeLang = (event) => {
    const languageSelected = event.target.innerText;
    const find = languageOptions.find((lang) => {
      return lang.text === languageSelected;
    });
    i18next.changeLanguage(find.value);
  };

  return (
    <Dropdown
      button
      className="icon"
      floating
      labeled
      icon="world"
      options={languageOptions}
      search
      onChange={handleChangeLang}
      text="Select Language"
    />
  );
};

export default DropdownExampleSearchDropdown;
