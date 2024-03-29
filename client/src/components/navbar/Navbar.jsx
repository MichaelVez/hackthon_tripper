import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import DropdownExampleSearchDropdown from "../Language/LanguageSelect";
import "./navbar.css";
import { useTranslation } from "react-i18next";
import { appContext } from "../../context/appContext";
import { logoutUser } from "../../api/users.api";

export default function Navbar() {
  const { token, setToken, userSignIn, setUserSignIn } = useContext(appContext);

  const handleLogout = async () => {
    await logoutUser(token);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUserSignIn(null);
  };

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

            {token ? (
              <>
                <Link onClick={handleLogout} className="item" to="/">
                  {t("navbar.logout")}
                </Link>
                <div className="item">
                  {t("navbar.welcome")}{" "}
                  {`${userSignIn.firstName} ${userSignIn.lastName}`}
                </div>
              </>
            ) : (
              <>
                <NavLink className="item" to="/login">
                  {t("navbar.login")}
                </NavLink>
                <NavLink className="item" to="/signup">
                  {t("navbar.signup")}
                </NavLink>
              </>
            )}
          </div>
          <div className="navber-left-side">
            <DropdownExampleSearchDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}
