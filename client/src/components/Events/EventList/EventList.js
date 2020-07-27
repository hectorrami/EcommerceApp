import React from 'react';
import './EventList.css';

import EventCard from './EventCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const eventList = (props) => {
  const classes = useStyles();
  return (
    <div>
      {props.events.length !== 0 ? (
        <div>
          {props.events.map((event) => (
            <EventCard
              event={event}
              authUserId={props.authUserId}
              onViewDetail={props.onViewDetail}
              key={event._id}
            />
          ))}
        </div>
      ) : (
        <div className={classes.center}>
          <h3>No products available :(</h3>
        </div>
      )}
    </div>
  );
};

export default eventList;
