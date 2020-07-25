import React from 'react';
import { makeStyles } from '@material-ui/core';
import loading from '../../loading.svg';

const useStyle = makeStyles({
  root: {
    marginTop: '30vh',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  loading: {
    height: '5em',
  },
});

const Spinner = () => {
  const classes = useStyle();
  return (
    <div className={classes.root} data-testid="loading">
      <img className={classes.loading} src={loading} alt="loading.." />
    </div>
  );
};

export default Spinner;
