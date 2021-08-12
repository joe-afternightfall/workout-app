import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import CalendarCells from './calendar/CalendarCells';
import CalendarHeader from './calendar/CalendarHeader';
import { addMonths, subMonths, format } from 'date-fns';
import CalendarControls from './calendar/CalendarControls';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  calendar: {
    display: 'block',
    position: 'relative',
    width: '100%',
    background: '#FFF',
    border: '1px solid #EEE',
  },
});

const today = new Date();

class Calendar extends Component<CalendarProps> {
  state = {
    currentMonth: today,
    selectedDate: today,
  };

  onDateClick = (day: Date): void => {
    this.setState({
      selectedDate: day,
    });
  };

  nextMonth = (): void => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = (): void => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1),
    });
  };

  render(): JSX.Element {
    const { classes } = this.props;
    const dateFormat = 'MMMM yyyy';

    return (
      <div className={classes.calendar}>
        <CalendarControls
          currentMonth={format(this.state.currentMonth, dateFormat)}
          prevMonthClickHandler={this.prevMonth}
          nextMonthClickHandler={this.nextMonth}
        />
        <CalendarHeader currentMonth={this.state.currentMonth} />
        <CalendarCells
          selectedDate={this.state.selectedDate}
          dateClickHandler={this.onDateClick}
          currentMonth={this.state.currentMonth}
        />
      </div>
    );
  }
}

export type CalendarProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(Calendar);
