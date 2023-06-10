import { render } from '../framework/render.js';
import NewPointButtonView from '../view/new-point-button-view.js';

export default class NewPointButtonPresenter {
<<<<<<< HEAD
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
=======
  #newPointButtonContainer = null;
  #destinationsModel = null;
  #pointsModel = null;
  #offersModel = null;
  #boardPresenter = null;
  #newPointButtonComponent = null;

  constructor({newPointButtonContainer, destinationsModel, pointsModel, offersModel, boardPresenter}) {
    this.#newPointButtonContainer = newPointButtonContainer;
    this.#destinationsModel = destinationsModel;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#boardPresenter = boardPresenter;
>>>>>>> master
  }

  init() {
    this.#componentNewPointButton = new NewPointButtonView();
  }

<<<<<<< HEAD
  renderButtonNewPoint = () => {
    render(this.#componentNewPointButton, this.#containerNewPointButton);
    this.#componentNewPointButton.setClickHandler(this.#handleNewPointButtonClick);
    if (this.#modelOffers.offers.length === 0 || this.#modelOffers.isSuccessfulLoading === false ||
      this.#modelDestinations.destinations.length === 0 || this.#modelDestinations.isSuccessfulLoading === false ||
      this.#modelPoints.isSuccessfulLoading === false) {
      this.#componentNewPointButton.element.disabled = true;
=======
  renderNewPointButton = () => {
    render(this.#newPointButtonComponent, this.#newPointButtonContainer);
    this.#newPointButtonComponent.setClickHandler(this.#handleNewPointButtonClick);
    if (this.#offersModel.offers.length === 0 || this.#offersModel.isSuccessfulLoading === false ||
      this.#destinationsModel.destinations.length === 0 || this.#destinationsModel.isSuccessfulLoading === false ||
      this.#pointsModel.isSuccessfulLoading === false) {
      this.#newPointButtonComponent.element.disabled = true;
>>>>>>> master
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

