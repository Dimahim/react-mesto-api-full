import React from 'react';
import logo from '../images/logo.svg';
import { Link } from "react-router-dom";

function Header({ headerText, login, link, loggedIn, onClick }) {
  // console.log(login)
  return (
    <header className="header">
      <div className="header__wrapper">
        <img className="header__logo" src={logo} alt="логотип" />
        <div className="header__wrapper">
          <p className="header__user-email">{login}</p>
          <Link to={link}
                onClick={onClick}
                className={`${loggedIn && 'header__link_log'} header__link`}
          >
            {headerText}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;