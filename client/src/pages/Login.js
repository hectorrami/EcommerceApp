import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Auth from '../pages/Auth';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
  },
  logo: {
    height: 160,
  },
});

const Login = () => {
  const classes = useStyles();
  return (
    <div data-testid="loginPage" className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Auth />
      </Grid>
    </div>
  );
};

export default Login;
