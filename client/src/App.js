import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Language from "./components/lang/Language";
import EventPage from "./Screens/Event_Page/EventPage";
import HomePage from "./Screens/Home_page/HomePage";
import RegisterPage from "./Screens/Register_Page/RegisterPage";
import LoginPage from "./Screens/Login_Page/LoginPage";
import { appContext } from "./context/appContext";
import { useContext, useEffect } from "react";

function App() {
  const { token, setToken, setUserSignIn } = useContext(appContext)

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem('token');
    const userSignInLocalStorage = localStorage.getItem('user');
    if (tokenLocalStorage && userSignInLocalStorage) {
      setToken(tokenLocalStorage);
      setUserSignIn(JSON.parse(userSignInLocalStorage));
    }

  }, [])

  return (
    <div className='App'>
      <Navbar />
      {/* <Language /> */}
      <Routes>
        {token ?
          <>
            <Route path='/event' element={<EventPage />} />
            <Route path='/event/:id' element={<EventPage />} />
            <Route path='/' exact element={<HomePage />} />
          </>
          :
          <>
            <Route path='/event' element={<EventPage />} />
            <Route path='/event/:id' element={<EventPage />} />
            <Route path='/' exact element={<HomePage />} />
            <Route path='/signup' exact element={<RegisterPage />} />
            <Route path='/login' exact element={<LoginPage />} />
          </>
        }
        {/* 404 page */}
        <Route path='/*' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
