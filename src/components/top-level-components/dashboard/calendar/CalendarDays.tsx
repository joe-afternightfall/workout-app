import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { addDays, format, startOfWeek } from 'date-fns';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function CalendarDays(props: CalendarDaysProps): JSX.Element {
  const classes = useStyles();
  const dateFormat = 'dddd';
  const days = [];
  const startDate = startOfWeek(props.currentMonth);

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col col-center" key={i}>
        {format(addDays(startDate, i), dateFormat)}
      </div>
    );
  }

  return <div className="days row">{days}</div>;
}

export interface CalendarDaysProps {
  currentMonth: Date;
}
