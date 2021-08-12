import React from 'react';
import './App.css';
import {
  addMonths,
  subMonths,
  addDays,
  startOfWeek,
  endOfWeek,
  format,
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  parseISO,
} from 'date-fns';
import CalendarControls from './calendar/CalendarControls';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarCells from './calendar/CalendarCells';

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  };

  renderHeader(): JSX.Element {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays(): JSX.Element {
    const dateFormat = 'dddd';
    const days = [];

    const startDate = startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells(): JSX.Element {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
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
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            key={i}
            onClick={() => this.onDateClick(parseISO(cloneDay.toString()))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={1}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

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
    const dateFormat = 'MMMM yyyy';

    return (
      <div className="calendar">
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

export default Calendar;
