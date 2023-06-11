import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import dayjs from 'dayjs';

export default class PointsModel extends Observable{
  #points = [];
  #pointsApiService = null;
  #offers = [];
  #destinations = [];
  #isSucceedLoading = false;

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points () {
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }

  get destinations () {
    return this.#destinations;
  }

  init = async () => {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#offers = await this.#pointsApiService.offers;
      this.#destinations = await this.#pointsApiService.destinations;
      this.#isSucceedLoading = true;
    } catch(err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
      this.#isSucceedLoading = false;
    }

    this._notify(UpdateType.INIT);
  };

  get isSucceedLoading() {
    return this.#isSucceedLoading;
  }

  updatePoint = async (updateType, update) => {

    const pointer = this.#points.findIndex((point) => point.id === update.id);

    if (pointer === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, pointer),
        updatedPoint,
        ...this.#points.slice(pointer + 1),
      ];

      this._notify(updateType, updatedPoint);

    } catch(err) {
      throw new Error('Can\'t update point');
    }
  };

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);

      this.#points = [
        newPoint,
        ...this.#points,
      ];

      this._notify(updateType, newPoint);

    } catch(err) {
      throw new Error('Can\'t add point');
    }
  };

  deletePoint = async (updateType, update) => {
    const pointer = this.#points.findIndex((point) => point.id === update.id);

    if (pointer === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);

      this.#points = [
        ...this.#points.slice(0, pointer),
        ...this.#points.slice(pointer + 1),
      ];

      this._notify(updateType);

    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  };

  #adaptToClient = (point) => {

    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      startDate: dayjs(point['date_from']),
      endDate: dayjs(point['date_to']),
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };
}
