import { FilterType } from '../const.js';
<<<<<<< HEAD
import { isPointDateFuture as isFuturePointDate, isPastPointDate, isFuturePastPointDate } from './date-point.js';
=======
import { isPointDateFuture, isPointDatePast, isPointDateFuturePast } from './date-point.js';
>>>>>>> master

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePointDate(point.dateFrom) || isFuturePastPointDate(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPointDate(point.dateTo) || isFuturePastPointDate(point.dateFrom, point.dateTo)),
};

export { filter };

