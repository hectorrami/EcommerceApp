import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Register from '../components/Register/Register';

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

const RegisterPage = () => {
  const classes = useStyles();
  return (
    <div data-testid="registerPage" className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Register />
      </Grid>
    </div>
  );
};

export default RegisterPage;
