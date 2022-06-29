import React, { useContext, useState } from "react";
import "./LoginBox.css";
// import { loginUser } from '../../API/ServerAPI/server.users';
import { appContext } from "../../../context/appContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import { loginUser } from "../../../api/users.api";
import { useTranslation } from "react-i18next";

const initialState = {
  email: "",
  password: "",
};

function LoginBox({ loginMode, setLoginMode }) {
  const [formLogin, setFormLogin] = useState(initialState);
  const [wrongMsg, setWrongMsg] = useState(false);
  const [spinner, setSpinner] = useState(false);

  let navigate = useNavigate();
  // Global State
  const { setToken, setUserSignIn } = useContext(appContext);

  const handleChange = ({ target: { name: nameInput, value } }) => {
    setFormLogin({ ...formLogin, [nameInput]: value });
  };

  const handleClick = async (event) => {
    event.preventDefault();
    if (!formLogin.email || !formLogin.password)
      return setWrongMsg("Please enter all fields");
    setSpinner(true);
    const userLogin = await loginUser(formLogin);
    setSpinner(false);
    console.log(userLogin);
    if (userLogin.error) return setWrongMsg(userLogin.error);

    const userToken = userLogin.token;
    setToken(userToken);
    setUserSignIn(userLogin.user);
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userLogin.user));
    navigate("/");
  };
  const { t } = useTranslation();
  return (
    <div className="login-container">
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <form className="login-form" action="">
            <div className="login-inputs">
              <input
                onChange={handleChange}
                placeholder={t("form.email")}
                name="email"
                value={formLogin.email}
                type="email"
                required
              />

              <input
                onChange={handleChange}
                placeholder={t("form.password")}
                name="password"
                autoComplete="true"
                password={formLogin.password}
                type="password"
                required
              />
            </div>

            <button onClick={handleClick} type="submit">
              {t("navbar.login")}
            </button>
          </form>

          <div className="login-bottom">
            {wrongMsg && (
              <h3 style={{ color: "red", textAlign: "center" }}>{wrongMsg}</h3>
            )}
            {/* {<h4>Don't have an account yet? <a>Sign Up</a></h4>} */}
          </div>
        </>
      )}
    </div>
  );
}

export default LoginBox;
