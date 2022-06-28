import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Language from "./components/lang/Language";
import EventPage from "./Screens/Event_Page/Eventpage";
import HomePage from "./Screens/Home_page/Homepage";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Language />
      <Routes>
        <Route path='/event' exact element={<EventPage />} />
        <Route path='/' exact element={<HomePage />} />
        {/* 404 page */}
        <Route path='/*' element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
