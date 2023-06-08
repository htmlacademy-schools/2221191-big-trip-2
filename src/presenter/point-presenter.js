import { render, replace, remove } from '../framework/render.js';
import PreviewPointView from '../view/preview-point-view.js';
import EditingPointView from '../view/editing-point-view.js';
import { UserAction, UpdateType } from '../const.js';

const Mode = {
  PREVIEW: 'preview',
  EDITING: 'editing',
};

export default class PointPresenter {
  #pointListContainer = null;
  #previewPointComponent = null;
  #editingPointComponent = null;
  #pointsModel = null;

  #destinations = null;
  #offers = null;

  #changeData = null;
  #changeMode = null;

  #point = null;
  #mode = Mode.PREVIEW;
  #isNewPoint = false;

  constructor(pointListContainer, pointsModel, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(point) {
    this.#point = point;
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    const prevPreviewPointComponent = this.#previewPointComponent;
    const prevEditingPointComponent = this.#editingPointComponent;

    this.#previewPointComponent = new PreviewPointView(point, this.#destinations, this.#offers);
    this.#editingPointComponent = new EditingPointView({
      point: point,
      destination: this.#destinations,
      offers: this.#offers,
      isNewPoint: this.#isNewPoint
    });

    this.#previewPointComponent.setEditClickHandler(this.#handleEditClick);
    this.#previewPointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editingPointComponent.setPreviewClickHandler(this.#handlePreviewClick);
    this.#editingPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editingPointComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevPreviewPointComponent === null || prevEditingPointComponent === null) {
      render(this.#previewPointComponent, this.#pointListContainer);
      return;
    }

    switch (this.#mode) {
      case Mode.PREVIEW:
        replace(this.#previewPointComponent, prevPreviewPointComponent);
        break;
      case Mode.EDITING:
        replace(this.#editingPointComponent, prevEditingPointComponent);
        break;
    }

    remove(prevPreviewPointComponent);
    remove(prevEditingPointComponent);
  }

  destroy = () => {
    remove(this.#previewPointComponent);
    remove(this.#editingPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.PREVIEW) {
      this.#editingPointComponent.reset(this.#point);
      this.#replaceEditingPointToPreviewPoint();
    }
  };

  #replacePreviewPointToEditingPoint = () => {
    replace(this.#editingPointComponent, this.#previewPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceEditingPointToPreviewPoint = () => {
    replace(this.#previewPointComponent, this.#editingPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.PREVIEW;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.resetView();
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
    this.resetView();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
    this.#replaceEditingPointToPreviewPoint();
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
