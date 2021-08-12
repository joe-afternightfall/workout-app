import {
  format,
  addDays,
  parseISO,
  isSameDay,
  endOfWeek,
  endOfMonth,
  startOfWeek,
  isSameMonth,
  startOfMonth,
} from 'date-fns';
import clsx from 'clsx';
import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CornerNumber from './cells/CornerNumber';
import BackgroundNumber from './cells/BackgroundNumber';

const useStyles = makeStyles(() =>
  createStyles({
    row: {
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      borderBottom: '1px solid #EEE',
      '&:last-child': {
        borderBottom: 'none',
      },
    },
    col: {
      flexGrow: 0,
      flexBasis: 'calc(100% / 7)',
      width: 'calc(100% / 7)',
      '&:last-child': {
        borderRight: 'none',
      },
      '&:hover': {
        background: '#F9F9F9',
        transition: '0.5s ease-out',
      },
    },
    cell: {
      position: 'relative',
      height: '5em',
      borderRight: '1px solid #eee',
      overflow: 'hidden',
      cursor: 'pointer',
      background: '#fff',
      transition: '0.25s ease-out',
      '&:hover': {
        background: '#F9F9F9',
        transition: '0.5s ease-out',
      },
    },
    disabled: {
      color: '#ccc',
      pointerEvents: 'none',
    },
    selected: {
      borderLeft: '10px solid transparent',
      borderImage: 'linear-gradient(45deg, #1a8fff 0%, #53cbf1 40%)',
      borderImageSlice: 1,
    },
  })
);

export default function CalendarCells(props: CalendarCellsProps): JSX.Element {
  const classes = useStyles();

  console.log('props.selectedDate: ' + JSON.stringify(props.selectedDate));

  const monthStart = startOfMonth(props.currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = 'd';
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      days.push(
        <div
          className={clsx(classes.col, classes.cell, {
            [classes.disabled]: !isSameMonth(day, monthStart),
            [classes.selected]: isSameDay(day, props.selectedDate),
          })}
          key={i}
          onClick={() => props.dateClickHandler(parseISO(cloneDay.toString()))}
        >
          <CornerNumber date={formattedDate} />
          <BackgroundNumber
            date={formattedDate}
            isSameDay={isSameDay(day, props.selectedDate)}
          />
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className={classes.row} key={1}>
        {days}
      </div>
    );
    days = [];
  }

  return <Grid>{rows}</Grid>;
}

export interface CalendarCellsProps {
  currentMonth: Date;
  selectedDate: Date;
  dateClickHandler: (day: Date) => void;
}
