import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';

import AuthContext from '../../context/auth-context';

const mainNavigation = () => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <header className="main-navigation">
            <div className="main-navigation__logo">
              <img
                alt="logo-icon"
                src="/Anayah-Logo-White.png"
                className="img"
              />
            </div>
            <nav className="main-navigation__items">
              <ul>
                {!context.token && (
                  <li>
                    <NavLink to="/auth">Login</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/events">Services</NavLink>
                </li>
                {context.token && (
                  <React.Fragment>
                    <li>
                      <NavLink to="/bookings">Appointments</NavLink>
                    </li>
                    <li>
                      <button onClick={context.logout}>Logout</button>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </nav>
          </header>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default mainNavigation;
