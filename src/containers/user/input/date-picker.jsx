import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const DateInput = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      dateFormat="yyyy/M/dd"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );
};

export default DateInput;
