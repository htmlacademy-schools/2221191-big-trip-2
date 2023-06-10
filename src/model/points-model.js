import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class PointsModel extends Observable{
  #locations = [];
  #apiServLocations = null;
  #isSucceedLoading = false;

  constructor(locaionApiService) {
    super();
    this.#apiServLocations = locaionApiService;
  }

  init = async () => {
    try {
      const locations = await this.#apiServLocations.points;
      this.#isSucceedLoading = true;
      this.#locations = locations.map(this.#adjustToClient);
    } catch(err) {
      this.#isSucceedLoading = false;
      this.#locations = [];
    }

    this._notify(UpdateType.INIT);
  };

  get points() {
    return this.#locations;
  }

  get isSucceedLoading() {
    return this.#isSucceedLoading;
  }

  upgradePoint = async (updateType, update) => {
    const pointer = this.#locations.findIndex((point) => point.id === update.id);

    if (pointer === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const answer = await this.#apiServLocations.updatePoint(update);
      const upgrededPoint = this.#adjustToClient(answer);
      this.#locations = [
        ...this.#locations.slice(0, pointer),
        upgrededPoint,
        ...this.#locations.slice(pointer + 1),
      ];
      this._notify(updateType, upgrededPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  };

  appendPoint = async (updateType, update) => {
    try {
      const answer = await this.#apiServLocations.addPoint(update);
      const newPoint = this.#adjustToClient(answer);
      this.#locations.unshift(newPoint);
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  };

  removePoint = async (updateType, update) => {
    const pointer = this.#locations.findIndex((point) => point.id === update.id);

    if (pointer === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#apiServLocations.deletePoint(update);
      this.#locations = [
        ...this.#locations.slice(0, pointer),
        ...this.#locations.slice(pointer + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  };

  #adjustToClient = (point) => {
    const adjustedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: (point['date_from'] !== null || point['date_from'] !== undefined) ? new Date(point['date_from']) : point['date_from'],
      dateTo: (point['date_to'] !== null || point['date_to'] !== undefined) ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adjustedPoint['base_price'];
    delete adjustedPoint['date_from'];
    delete adjustedPoint['date_to'];
    delete adjustedPoint['is_favorite'];

    return adjustedPoint;
  };
}
