import { render, remove, RenderPosition } from '../framework/render.js';
import PointView from '../view/point-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class PointNewPresenter {
  #containerPointList = null;

  #componentCreatingPoint = null;
  #changeData = null;
  #destroyCallback = null;

  #modelDestinations = null;
  #modelOffers = null;

  #destinations = null;
  #offers = null;

  constructor({pointListContainer, changeData, destinationsModel, offersModel}) {
    this.#containerPointList = pointListContainer;
    this.#changeData = changeData;
    this.#modelDestinations = destinationsModel;
    this.#modelOffers = offersModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#componentCreatingPoint !== null) {
      return;
    }
    this.#destinations = [...this.#modelDestinations.destinations];
    this.#offers = [...this.#modelOffers.offers];

    this.#componentCreatingPoint = new PointView({
      destinations: this.#destinations,
      offers: this.#offers,
      isNewPoint: true
    });
    this.#componentCreatingPoint.setFormSubmitHandler(this.#handleFormSubmit);
    this.#componentCreatingPoint.setResetClickHandler(this.#handleResetClick);

    render(this.#componentCreatingPoint, this.#containerPointList, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#componentCreatingPoint === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#componentCreatingPoint);
    this.#componentCreatingPoint = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  defineSaving = () => {
    this.#componentCreatingPoint.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  defineAborting = () => {
    this.#componentCreatingPoint.shake(this.#resetFormState);
  };

  #resetFormState = () => {
    this.#componentCreatingPoint.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleResetClick = () => {
    this.destroy();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}

