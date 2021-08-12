import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles(() =>
  createStyles({
    centerAlign: {
      textAlign: 'center',
    },
  })
);

export default function CalendarControls(
  props: CalendarControlsProps
): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container alignItems={'center'}>
      <Grid item xs={2} className={classes.centerAlign}>
        <IconButton
          onClick={() => {
            props.prevMonthClickHandler();
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Grid>

      <Grid item xs={8} className={classes.centerAlign}>
        <Typography>{props.currentMonth}</Typography>
      </Grid>

      <Grid item xs={2} className={classes.centerAlign}>
        <IconButton
          onClick={() => {
            props.nextMonthClickHandler();
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export interface CalendarControlsProps {
  currentMonth: string;
  prevMonthClickHandler: () => void;
  nextMonthClickHandler: () => void;
}
