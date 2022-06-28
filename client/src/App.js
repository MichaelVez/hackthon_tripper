import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Eventpage from "./components/eventPage/Eventpage";
import Language from "./components/lang/Language";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Language />
      <Routes>
        <Route path='/event' exact element={<Eventpage />} />
        <Route path='/' exact element={<Homepage />} />
        {/* 404 page */}
        <Route path='/*' element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
