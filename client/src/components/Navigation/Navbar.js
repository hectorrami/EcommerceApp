import React from 'react';
import AuthContext from '../../context/auth-context';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  ButtonBase,
  IconButton,
  Typography,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    background: 'black',
  },
  button: {
    color: 'white',
    textDecorationLine: 'none',
    '&:hover': {
      color: 'white',
    },
  },
  smallLogo: {
    height: 50,
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                />
                <ButtonBase>
                  <img
                    alt="logo-icon"
                    src="/Anayah-Logo-White.png"
                    className={classes.smallLogo}
                  />
                </ButtonBase>
                <Typography variant="h6" className={classes.title}>
                  Anayah's Salon
                </Typography>
                {!context.token && (
                  <React.Fragment>
                    <Button>
                      <NavLink to="/" className={classes.link}>
                        Login
                      </NavLink>
                    </Button>
                    <Button>
                      <NavLink to="register" className={classes.link}>
                        Register
                      </NavLink>
                    </Button>
                  </React.Fragment>
                )}
                {context.token && (
                  <React.Fragment>
                    <React.Fragment>
                      <Button>
                        <NavLink to="/events" className={classes.link}>
                          Services
                        </NavLink>
                      </Button>
                      <Button>
                        <NavLink to="/bookings" className={classes.link}>
                          Appointments
                        </NavLink>
                      </Button>
                      <Button
                        onClick={context.logout}
                        className={classes.button}
                      >
                        Logout
                      </Button>
                    </React.Fragment>
                  </React.Fragment>
                )}
              </Toolbar>
            </AppBar>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navbar;
