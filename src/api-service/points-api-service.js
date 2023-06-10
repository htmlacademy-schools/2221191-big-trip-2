import ApiService from '../framework/api-service.js';
import { ApiServiceResponseMethod } from '../const.js';

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  updatePoint = async (point) => {
    const answer = await this._load({
      url: `points/${point.id}`,
      method: ApiServiceResponseMethod.PUT,
      body: JSON.stringify(this.#fitToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedAnswer = await ApiService.parseResponse(answer);

    return parsedAnswer;
  };

  appendPoint = async (point) => {
    const answer = await this._load({
      url: 'points',
      method: ApiServiceResponseMethod.POST,
      body: JSON.stringify(this.#fitToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedAnswer = await ApiService.parseResponse(answer);

    return parsedAnswer;
  };

  removePoint = async (point) => {
    const answer = await this._load({
      url: `points/${point.id}`,
      method: ApiServiceResponseMethod.DELETE,
    });

    return answer;
  };

  #fitToServer = (point) => {
    const fittedPoint = {...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
      'is_favorite': point.isFavorite,
    };

    // Ненужные ключи мы удаляем
    delete fittedPoint.basePrice;
    delete fittedPoint.dateFrom;
    delete fittedPoint.dateTo;
    delete fittedPoint.isFavorite;

    return fittedPoint;
  };
}
