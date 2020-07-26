import React from 'react';

import './BookingList.css';
import { FaTimesCircle } from 'react-icons/fa';

const bookingList = (props) => (
  <ul className="bookings__list">
    {props.bookings.map((booking) => {
      return (
        <div>
          <li key={booking._id} className="bookings__item">
            <div className="bookings__item-data">
              {'Service: '}
              {booking.event.title} <br />
              {'Date: '}
              {new Date(booking.createdAt).toLocaleDateString()}
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
        </div>
      );
    })}
  </ul>
);

export default bookingList;
