import dayjs from 'dayjs';
const HOUR_MINUTES_COUNT = 60;
<<<<<<< HEAD
const FULL_DAY_MINUTES_COUNT = 1440;
const DATE_TYPE = 'YYYY-MM-DD';
const DATE_TIME_TYPE = 'DD/MM/YY HH:mm';
const TIME_TYPE = 'HH:mm';

const adaptPointDueDate = (date) => dayjs(date).format('DD MMM');

const getOutputDays = (days) => days <= 0 ? '' : `${`${days}`.padStart(2, '0')}D`;

const getOutputHours = (days, restHours) => (days <= 0 && restHours <= 0) ? '' : `${`${restHours}`.padStart(2, '0')}H`;

const getOutputMinutes = (restMinutes) => `${`${restMinutes}`.padStart(2, '0')}M`;

const getLengthTrip = (dateFrom, dateTo) => {
  const beginning = dayjs(dateFrom);
  const ending = dayjs(dateTo);
  const difference = ending.diff(beginning, 'minute');

  const daysNumber = Math.trunc(difference / FULL_DAY_MINUTES_COUNT);
  const hoursRest = Math.trunc((difference - daysNumber * FULL_DAY_MINUTES_COUNT) / HOUR_MINUTES_COUNT);
  const minutesRest = difference - (daysNumber * FULL_DAY_MINUTES_COUNT + hoursRest * HOUR_MINUTES_COUNT);

  const outputDays = getOutputDays(daysNumber);
  const outputHours = getOutputHours(daysNumber, hoursRest);
  const outputMinutes = getOutputMinutes(minutesRest);

  return `${outputDays} ${outputHours} ${outputMinutes}`;
};

const getDate = (date) => dayjs(date).format(DATE_TYPE);

const getTime = (date) => dayjs(date).format(TIME_TYPE);

const getDateTime = (date) => dayjs(date).format(DATE_TIME_TYPE);

const isPastPointDate = (dateTo) => dayjs().diff(dateTo, 'minute') > 0;

const isFuturePointDate = (dateFrom) => dayjs().diff(dateFrom, 'minute') <= 0;

const isFuturePastPointDate = (dateFrom, dateTo) => dayjs().diff(dateFrom, 'minute') > 0 && dayjs().diff(dateTo, 'minute') < 0;

export { adaptPointDueDate, getLengthTrip, getDate, getDateTime, getTime, isPastPointDate, isFuturePointDate, isFuturePastPointDate };
=======
const TOTAL_DAY_MINUTES_COUNT = 1440;
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';

const humanizePointDueDate = (date) => dayjs(date).format('DD MMM');

const getDaysOutput = (days) => days <= 0 ? '' : `${`${days}`.padStart(2, '0')}D`;

const getHoursOutput = (days, restHours) => (days <= 0 && restHours <= 0) ? '' : `${`${restHours}`.padStart(2, '0')}H`;

const getMinutesOutput = (restMinutes) => `${`${restMinutes}`.padStart(2, '0')}M`;

const getDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const difference = end.diff(start, 'minute');

  const days = Math.trunc(difference / TOTAL_DAY_MINUTES_COUNT);
  const restHours = Math.trunc((difference - days * TOTAL_DAY_MINUTES_COUNT) / HOUR_MINUTES_COUNT);
  const restMinutes = difference - (days * TOTAL_DAY_MINUTES_COUNT + restHours * HOUR_MINUTES_COUNT);

  const daysOutput = getDaysOutput(days);
  const hoursOutput = getHoursOutput(days, restHours);
  const minutesOutput = getMinutesOutput(restMinutes);

  return `${daysOutput} ${hoursOutput} ${minutesOutput}`;
};

const getDate = (date) => dayjs(date).format(DATE_FORMAT);

const getTime = (date) => dayjs(date).format(TIME_FORMAT);

const getDateTime = (date) => dayjs(date).format(DATE_TIME_FORMAT);

const isPointDatePast = (dateTo) => dayjs().diff(dateTo, 'minute') > 0;

const isPointDateFuture = (dateFrom) => dayjs().diff(dateFrom, 'minute') <= 0;

const isPointDateFuturePast = (dateFrom, dateTo) => dayjs().diff(dateFrom, 'minute') > 0 && dayjs().diff(dateTo, 'minute') < 0;

export { humanizePointDueDate, getDuration, getDate, getDateTime, getTime, isPointDatePast, isPointDateFuture, isPointDateFuturePast };
>>>>>>> master
