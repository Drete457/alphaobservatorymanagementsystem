import { useState } from 'react';

const useDatePicker = () => {
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const renderDatePicker = () => {
    return (
      <div>
        <div className="flex items-center">
          <input
            name="beginDate"
            className="px-2 py-1 rounded mr-1 border border-greyborder focus:outline focus:outline-purple"
            type="date"
            value={beginDate}
            onChange={(e) => setBeginDate(e.target.value)}
          />
          -
          <input
            className="px-2 py-1 rounded ml-1 border border-greyborder focus:outline focus:outline-purple"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
    );
  };

  return { beginDate, endDate, renderDatePicker };
};

export default useDatePicker;
