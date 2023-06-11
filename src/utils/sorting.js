import dayjs from 'dayjs';
import { SortType } from '../const';

const sortByTime = (pointA, pointB) => {
  const timePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timePointB - timePointA;
};

const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sorting = {
  [SortType.DAY]: (points) => points.sort(sortByDay),
  [SortType.TIME]: (points) => points.sort(sortByTime),
  [SortType.PRICE]: (points) => points.sort(sortByPrice)
};

export { sorting };


