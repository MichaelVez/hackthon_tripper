import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
export default function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbarlogo'>tripper.</div>
      <Link to='/'>Homepage</Link>
      <Link to='/event'>Events</Link>
    </div>
  );
}
