import dayjs from 'dayjs';
const HOUR_MINUTES_COUNT = 60;
const FULL_DAY_MINUTES_COUNT = 1440;
const DATE_TYPE = 'YYYY-MM-DD';
const DATE_TIME_TYPE = 'DD/MM/YY HH:mm';
const TIME_TYPE = 'HH:mm';

const convertPointDueDate = (date) => dayjs(date).format('DD MMM');

const getDaysResult = (days) => days <= 0 ? '' : `${`${days}`.padStart(2, '0')}D`;

const getHoursResult = (days, restHours) => (days <= 0 && restHours <= 0) ? '' : `${`${restHours}`.padStart(2, '0')}H`;

const getMinutesResult = (restMinutes) => `${`${restMinutes}`.padStart(2, '0')}M`;

const getLenght = (dateFrom, dateTo) => {
  const begining = dayjs(dateFrom);
  const ending = dayjs(dateTo);
  const difference = ending.diff(begining, 'minute');

  const days = Math.trunc(difference / FULL_DAY_MINUTES_COUNT);
  const hours = Math.trunc((difference - days * FULL_DAY_MINUTES_COUNT) / HOUR_MINUTES_COUNT);
  const minutes = difference - (days * FULL_DAY_MINUTES_COUNT + hours * HOUR_MINUTES_COUNT);

  const daysResult = getDaysResult(days);
  const hoursResult = getHoursResult(days, hours);
  const minutesResult = getMinutesResult(minutes);

  return `${daysResult} ${hoursResult} ${minutesResult}`;
};

const getDate = (date) => dayjs(date).format(DATE_TYPE);

const getTime = (date) => dayjs(date).format(TIME_TYPE);

const getDateTime = (date) => dayjs(date).format(DATE_TIME_TYPE);

const isPastPointDate = (dateTo) => dayjs().diff(dateTo, 'minute') > 0;

const isFuturePointDate = (dateFrom) => dayjs().diff(dateFrom, 'minute') <= 0;

const isFuturePastPointDate = (dateFrom, dateTo) => dayjs().diff(dateFrom, 'minute') > 0 && dayjs().diff(dateTo, 'minute') < 0;

export { convertPointDueDate, getLenght, getDate, getDateTime, getTime, isPastPointDate, isFuturePointDate, isFuturePastPointDate };
