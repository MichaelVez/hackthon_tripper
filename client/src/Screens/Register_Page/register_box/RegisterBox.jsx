import React, { useContext, useState } from "react";

// import { createNewUser, loginUser } from '../../API/ServerAPI/server.users';
import { appContext } from "../../../context/appContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import { useTranslation } from "react-i18next";

import "./RegisterBox.css";
import { Link } from "react-router-dom";
import { createNewUser } from "../../../api/users.api";

const initialState = {
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  password: "",
};

function RegisterBox() {
  const [formRegister, setFormRegister] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  // Global State
  const { setToken, setUserSignIn } = useContext(appContext);

  const handleChange = ({ target: { name: nameInput, value } }) => {
    setFormRegister({ ...formRegister, [nameInput]: value });
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const { firstName, lastName, age, email, password } = formRegister;
    if (!firstName || !lastName || !age || !email || !password)
      return setErrorMsg("Please enter all fields");

    setSpinner(true);
    const userCreated = await createNewUser({ ...formRegister, age: +age });
    setSpinner(false);
    if (userCreated.response && userCreated.response.status === 400)
      return setErrorMsg(userCreated.response.statusText);

    const userToken = userCreated.token;
    setToken(userToken);
    setUserSignIn(userCreated.user);
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", userCreated.user);
    navigate("/");
  };
  const { t } = useTranslation();

  return (
    <div className="register-container">
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <form className="register-form" action="">
            <div className="register-inputs">
              <input
                onChange={handleChange}
                placeholder={t("form.firstname")}
                name="firstName"
                value={formRegister.firstName}
                type="text"
                required
              />

              <input
                onChange={handleChange}
                placeholder={t("form.lastname")}
                name="lastName"
                value={formRegister.lastName}
                type="text"
                required
              />

              <input
                onChange={handleChange}
                placeholder={t("form.age")}
                name="age"
                value={formRegister.age}
                type="number"
                required
              />

              <input
                onChange={handleChange}
                placeholder={t("form.email")}
                name="email"
                value={formRegister.email}
                type="email"
                required
              />

              <input
                onChange={handleChange}
                placeholder={t("form.password")}
                name="password"
                autoComplete="true"
                password={formRegister.password}
                type="password"
                required
              />
            </div>

            <button onClick={handleClick} type="submit">
              {t("form.Register")}
            </button>
          </form>

          <div className="register-bottom">
            {errorMsg && (
              <h3 style={{ color: "red", textAlign: "center" }}>{errorMsg}</h3>
            )}
            {
              <h4>
                {t("form.massage")} <Link to="/login">{t("navbar.login")}</Link>
              </h4>
            }
          </div>
        </>
      )}
    </div>
  );
}

export default RegisterBox;
