import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Language from "./components/lang/Language";
import EventPage from "./Screens/Event_Page/EventPage";
import HomePage from "./Screens/Home_page/HomePage";

function App() {
  return (
    <div className='App'>
      <Navbar />
      {/* <Language /> */}
      <Routes>
        <Route path='/event' element={<EventPage />} />
        <Route path='/' exact element={<HomePage />} />
        {/* 404 page */}
        <Route path='/*' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
