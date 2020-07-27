import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventItem from './EventItem/EventItem';
import './EventList.css';
import product from '../../../product.jpg';

const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    margin: 10,
    maxWidth: 370,
    background: 'white',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const EventCard = ({ event, authUserId, onViewDetail }) => {
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.center}>
      <Card className={classes.root}>
        <CardHeader
          title="Product"
          subheader="Click to view more details about this product."
        />
        <CardMedia
          className={classes.media}
          image={product}
          title="stock photo"
        />
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <EventItem
              key={event._id}
              eventId={event._id}
              title={event.title}
              price={event.price}
              date={event.date}
              userId={authUserId}
              creatorId={event.creator._id}
              onDetail={onViewDetail}
            />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default EventCard;
