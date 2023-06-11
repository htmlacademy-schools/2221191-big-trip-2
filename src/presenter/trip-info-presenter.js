import { render, remove } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #points = null;
  #tripInformationComponent = null;
  #tripInformationContainer = null;
  #destinationsModel = null;
  #offersModel = null;

  #destinations = null;
  #offers = null;

  constructor(tripInfoContainer, destinationsModel, offersModel) {
    this.#tripInformationContainer = tripInfoContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init = (points) => {
    this.#points = points;
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    this.#tripInformationComponent = new TripInfoView(this.#points, this.#destinations, this.#offers);

    render(this.#tripInformationComponent, this.#tripInformationContainer);
  };

  destroy = () => {
    remove(this.#tripInformationComponent);
  };
}

