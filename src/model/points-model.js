export default class PointsModel {
  #points = [];
  #destinations = [];
  #offers = [];

  init(points, destinations, offers) {
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  getPoints() {
    return this.#points;
  }

  getDestinations() {
    return this.#destinations;
  }

  getOffers() {
    return this.#offers;
  }
}
