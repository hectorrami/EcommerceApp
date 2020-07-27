import React from 'react';

import './BookingList.css';
import { FaTimesCircle } from 'react-icons/fa';
import { Paper } from '@material-ui/core';

const bookingList = (props) => (
  <ul className="bookings__list">
    {props.bookings.map((booking) => {
      return (
        <div key={booking._id}>
          <Paper>
            <li className="bookings__item">
              <div className="bookings__item-data">
                {booking.event.title} <br />
              </div>
              <div className="bookings__item-actions">
                <FaTimesCircle
                  onClick={props.onDelete.bind(this, booking._id)}
                  color="red"
                  cursor="pointer"
                  size="2rem"
                />
              </div>
            </li>
          </Paper>
        </div>
      );
    })}
  </ul>
);

export default bookingList;
