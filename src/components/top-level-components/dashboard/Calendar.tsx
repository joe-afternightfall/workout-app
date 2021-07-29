import React, { useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import DateFnsUtils from '@date-io/date-fns';
import { Card } from '@material-ui/core';

const StaticDatePicker = () => {
  const [date, setDate] = useState(new Date());

  const handleChange = (date: MaterialUiPickersDate) => {
    if (date) {
      setDate(new Date(date.toString()));
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Card>
        <DatePicker
          autoOk
          value={date}
          openTo={'date'}
          variant={'static'}
          onChange={handleChange}
          orientation={'landscape'}
        />
      </Card>
    </MuiPickersUtilsProvider>
  );
};

export default StaticDatePicker;
