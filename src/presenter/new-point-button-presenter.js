import { render } from '../framework/render.js';
import NewPointButtonView from '../view/new-point-button-view.js';

export default class NewPointButtonPresenter {
  #containerNewPointButton = null;

  #modelDestinations = null;
  #modelPoints = null;
  #modelOffers = null;

  #presenterBoard = null;

  #componentNewPointButton = null;

  constructor({newPointButtonContainer, destinationsModel, pointsModel, offersModel, boardPresenter}) {
    this.#containerNewPointButton = newPointButtonContainer;
    this.#modelDestinations = destinationsModel;
    this.#modelPoints = pointsModel;
    this.#modelOffers = offersModel;
    this.#presenterBoard = boardPresenter;
  }

  init() {
    this.#componentNewPointButton = new NewPointButtonView();
  }

  renderButtonNewPoint = () => {
    render(this.#componentNewPointButton, this.#containerNewPointButton);
    this.#componentNewPointButton.setClickHandler(this.#handleNewPointButtonClick);
    if (this.#modelOffers.offers.length === 0 || this.#modelOffers.isSuccessfulLoading === false ||
      this.#modelDestinations.destinations.length === 0 || this.#modelDestinations.isSuccessfulLoading === false ||
      this.#modelPoints.isSuccessfulLoading === false) {
      this.#componentNewPointButton.element.disabled = true;
    }
  };

  #handleNewPointFormClose = () => {
    this.#componentNewPointButton.element.disabled = false;
  };

  #handleNewPointButtonClick = () => {
    this.#presenterBoard.createPoint(this.#handleNewPointFormClose);
    this.#componentNewPointButton.element.disabled = true;
  };
}

