import React from 'react';
import './EventList.css';
import EventCard from './EventCard';

const eventList = (props) => {
  const events = props.events.map((event) => {
    return (
      <div key={event._id}>
        <EventCard
          event={event}
          authUserId={props.authUserId}
          onViewDetail={props.onViewDetail}
        />
      </div>
    );
  });

  return <ul className="event__list">{events}</ul>;
};

export default eventList;
