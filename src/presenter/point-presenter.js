import { render, replace, remove } from '../framework/render.js';
import PreviewPointView from '../view/preview-point-view.js';
import PointView from '../view/point-view.js';
import { UserAction, UpdateType } from '../const.js';

const Mode = {
  PREVIEW: 'preview',
  EDITING: 'editing',
};

export default class PointPresenter {
  #containerPointList = null;
  #componentPreviewPoint = null;
  #componentEditingPoint = null;

  #modelDestinations = null;
  #modelOffers = null;

  #destinations = null;
  #offers = null;

  #changeData = null;
  #changeMode = null;

  #point = null;
  #mode = Mode.PREVIEW;

  constructor({pointListContainer, changeData, changeMode, destinationsModel, offersModel}) {
    this.#containerPointList = pointListContainer;
    this.#modelDestinations = destinationsModel;
    this.#modelOffers = offersModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(point) {
    this.#point = point;
    this.#destinations = [...this.#modelDestinations.destinations];
    this.#offers = [...this.#modelOffers.offers];

    const prevPreviewPointComponent = this.#componentPreviewPoint;
    const prevEditingPointComponent = this.#componentEditingPoint;

    this.#componentPreviewPoint = new PreviewPointView(point, this.#destinations, this.#offers);
    this.#componentEditingPoint = new PointView({
      point: point,
      destinations: this.#destinations,
      offers: this.#offers,
      isNewPoint: false
    });

    this.#componentPreviewPoint.setEditClickHandler(this.#handleEditClick);
    this.#componentPreviewPoint.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#componentEditingPoint.setPreviewClickHandler(this.#handlePreviewClick);
    this.#componentEditingPoint.setFormSubmitHandler(this.#handleFormSubmit);
    this.#componentEditingPoint.setResetClickHandler(this.#handleResetClick);

    if (prevPreviewPointComponent === null || prevEditingPointComponent === null) {
      render(this.#componentPreviewPoint, this.#containerPointList);
      return;
    }

    switch (this.#mode) {
      case Mode.PREVIEW:
        replace(this.#componentPreviewPoint, prevPreviewPointComponent);
        break;
      case Mode.EDITING:
        replace(this.#componentPreviewPoint, prevEditingPointComponent);
        this.#mode = Mode.PREVIEW;
        break;
    }

    remove(prevPreviewPointComponent);
    remove(prevEditingPointComponent);
  }

  destroy = () => {
    remove(this.#componentPreviewPoint);
    remove(this.#componentEditingPoint);
  };

  redefineView = () => {
    if (this.#mode !== Mode.PREVIEW) {
      this.#componentEditingPoint.reset(this.#point);
      this.#replaceEditingPointToPreviewPoint();
    }
  };

  defineSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#componentEditingPoint.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  defineDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#componentEditingPoint.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  defineAborting = () => {
    if (this.#mode === Mode.PREVIEW) {
      this.#componentPreviewPoint.shake();
      return;
    }

    this.#componentEditingPoint.shake(this.#resetFormState);
  };

  #resetFormState = () => {
    this.#componentEditingPoint.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  };

  #replacePreviewPointToEditingPoint = () => {
    replace(this.#componentEditingPoint, this.#componentPreviewPoint);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceEditingPointToPreviewPoint = () => {
    replace(this.#componentPreviewPoint, this.#componentEditingPoint);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.PREVIEW;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.redefineView();
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleEditClick = () => {
    this.#replacePreviewPointToEditingPoint();
  };

  #handlePreviewClick = () => {
    this.redefineView();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleResetClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}

