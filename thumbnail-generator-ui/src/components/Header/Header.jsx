import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("user");

  const handleClick = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    window.location.replace("/");
  };
  return (
    <div className="header">
      <nav className="header__menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/upload">Upload</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link to="/" onClick={handleClick}>
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
