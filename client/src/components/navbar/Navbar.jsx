import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import DropdownExampleSearchDropdown from "../Language/LanguageSelect";
import "./navbar.css";
import { useTranslation } from "react-i18next";
export default function Navbar() {
  const { t } = useTranslation();
  return (
    <div className="navbar">
      <div className="ui inverted segment">
        <div className="ui inverted secondary pointing menu">
          <div className="navbar-right-side">
            <NavLink to="/">
              <div className="navbarlogo">tripper.</div>
            </NavLink>
            <NavLink className="item" to="/">
              {t("navbar.homepage")}
            </NavLink>
            <NavLink className="item" to="/login">
              {t("navbar.login")}
            </NavLink>
            <NavLink className="item" to="/signup">
              {t("navbar.signup")}
            </NavLink>
            <NavLink className="item" to="/events">
              {t("navbar.events")}
            </NavLink>
          </div>
          <div className="navber-left-side">
            <DropdownExampleSearchDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}
