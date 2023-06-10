import { FilterType } from '../const.js';
import { isPointDateFuture as isFuturePointDate, isPastPointDate, isFuturePastPointDate } from './date-point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePointDate(point.dateFrom) || isFuturePastPointDate(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPointDate(point.dateTo) || isFuturePastPointDate(point.dateFrom, point.dateTo)),
};

export { filter };

