import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import LoginPage from './pages/Login';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import RegisterPage from './pages/RegisterPage';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null,
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <React.Fragment>
            <AuthContext.Provider
              value={{
                token: this.state.token,
                userId: this.state.userId,
                login: this.login,
                logout: this.logout,
              }}
            >
              <MainNavigation />
              <main className="main-content">
                <Switch>
                  {this.state.token && <Redirect from="/" to="/events" exact />}
                  {this.state.token && (
                    <Redirect from="/login" to="/events" exact />
                  )}
                  {!this.state.token && (
                    <Route path="/login" component={LoginPage} />
                  )}
                  <Route path="/events" component={EventsPage} />
                  {this.state.token && (
                    <Route path="/bookings" component={BookingsPage} />
                  )}
                  {!this.state.token && <Redirect to="/login" exact />}
                </Switch>
              </main>
              {/* <Switch>
                <Route exact path="/">
                  <LoginPage />
                </Route>
                <Route exact path="/register">
                  <RegisterPage />
                </Route>
                <PrivateRoute exact path="/events" token={this.state.token}>
                  <EventsPage />
                </PrivateRoute>
                <PrivateRoute exact path="/bookings" token={this.state.token}>
                  <BookingsPage />
                </PrivateRoute>
              </Switch> */}
            </AuthContext.Provider>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
