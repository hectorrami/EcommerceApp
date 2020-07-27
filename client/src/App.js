import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './pages/Login';
import BookingsPage from './pages/Bookings';
import ProfilePage from './pages/ProfilePage';
import EventsPage from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';
import RegisterPage from './pages/RegisterPage';

class App extends Component {
  state = {
    token: null,
    userId: null,
    role: null,
  };

  login = (token, userId, role, tokenExpiration) => {
    this.setState({ token: token, userId: userId, role: role });
  };

  logout = () => {
    this.setState({ token: null, userId: null, role: null });
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
                role: this.state.role,
                login: this.login,
                logout: this.logout,
              }}
            >
              <MainNavigation />
              <main className="main-content">
                <Switch>
                  {this.state.token && <Redirect from="/" to="/events" exact />}
                  {!this.state.token && (
                    <Switch>
                      <Route exact path="/">
                        <LoginPage />
                      </Route>
                      <Route exact path="/register">
                        <RegisterPage />
                      </Route>
                      <Route exact path="/profile">
                        <ProfilePage />
                      </Route>
                    </Switch>
                  )}
                  <Route path="/events" component={EventsPage} />
                  {this.state.token && (
                    <Route path="/bookings" component={BookingsPage} />
                  )}
                  {!this.state.token && <Redirect to="/register" />}
                </Switch>
              </main>
            </AuthContext.Provider>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
