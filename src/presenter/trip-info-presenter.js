import { render, remove } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #points = null;
  #componentTripInformation = null;
  #containerTripInformation = null;
  #modelDestinations = null;
  #modelOffers = null;

  #destinations = null;
  #offers = null;

  constructor(tripInfoContainer, destinationsModel, offersModel) {
    this.#containerTripInformation = tripInfoContainer;
    this.#modelDestinations = destinationsModel;
    this.#modelOffers = offersModel;
  }

  init = (points) => {
    this.#points = points;
    this.#destinations = [...this.#modelDestinations.destinations];
    this.#offers = [...this.#modelOffers.offers];

    this.#componentTripInformation = new TripInfoView(this.#points, this.#destinations, this.#offers);

    render(this.#componentTripInformation, this.#containerTripInformation);
  };

  destroy = () => {
    remove(this.#componentTripInformation);
  };
}
