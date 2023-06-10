import dayjs from 'dayjs';
import { SortType } from '../const';

const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortPointDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointTime = (pointA, pointB) => {
  const timeA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timeB - timeA;
};

const sorting = {
  [SortType.DAY]: (points) => points.sort(sortPointDay),
  [SortType.TIME]: (points) => points.sort(sortPointTime),
  [SortType.PRICE]: (points) => points.sort(sortPointPrice)
};

export { sorting };
