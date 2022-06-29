import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import DropdownExampleSearchDropdown from "../Language/LanguageSelect";
import "./navbar.css";
export default function Navbar() {
  return (
    <div className='navbar'>
      <div className='ui inverted segment'>
        <div className='ui inverted secondary pointing menu'>
          <div className='navbar-right-side'>
            <NavLink to='/'>
              <div className='navbarlogo'>tripper.</div>
            </NavLink>
            <NavLink className='item' to='/'>
              Home
            </NavLink>
            <NavLink className='item' to='/login'>
              Log In
            </NavLink>
            <NavLink className='item' to='/signup'>
              Sign Up
            </NavLink>
            <NavLink className='item' to='/event'>
              Events
            </NavLink>
          </div>
          <div className='navber-left-side'>
            <DropdownExampleSearchDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}
