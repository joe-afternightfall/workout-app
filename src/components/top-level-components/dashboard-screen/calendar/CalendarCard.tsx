import React from 'react';
import { connect } from 'react-redux';
import { Card } from '@material-ui/core';
import CalendarCells from './components/CalendarCells';
import { addMonths, format, subMonths } from 'date-fns';
import CalendarHeader from './components/CalendarHeader';
import CalendarControls from './components/CalendarControls';
import { State } from '../../../../configs/redux/store';
import { WorkoutVO } from '../../../../configs/models/WorkoutVO';

const CalendarCard = (): JSX.Element => {
  const dateFormat = 'MMMM yyyy';
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(today);
  const [selectedDate, setSelectedDate] = React.useState(today);

  const onDateClick = (day: Date): void => {
    setSelectedDate(day);
  };

  const nextMonth = (): void => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = (): void => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <Card>
      <CalendarControls
        currentMonth={format(currentMonth, dateFormat)}
        prevMonthClickHandler={prevMonth}
        nextMonthClickHandler={nextMonth}
      />
      <CalendarHeader currentMonth={currentMonth} />
      <CalendarCells
        selectedDate={selectedDate}
        dateClickHandler={onDateClick}
        currentMonth={currentMonth}
      />
    </Card>
  );
};

export interface CalendarCardProps {
  userWorkouts: WorkoutVO[];
}

const mapStateToProps = (state: State): CalendarCardProps => {
  return {
    userWorkouts: state.applicationState.userWorkouts,
  } as unknown as CalendarCardProps;
};

const mapDispatchToProps = (): CalendarCardProps =>
  ({} as unknown as CalendarCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarCard);
