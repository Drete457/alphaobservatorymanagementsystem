import moment from 'moment-timezone';

const minuteUpdate = (setGlobalHour) => {
  const localTime = new Date().toISOString();
  setGlobalHour(moment(localTime));
};

export default minuteUpdate;
