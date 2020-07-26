import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventItem from './EventItem/EventItem';
import './EventList.css';
import threading from '../../../threading.jpg';

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
          title="Anayah's Salon Service"
          subheader="Click the dropdown to view service details"
        />
        <CardMedia
          className={classes.media}
          image={threading}
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
