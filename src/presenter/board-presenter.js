import { render, RenderPosition, remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import PointsListView from '../view/points-list-view.js';
import SortingView from '../view/sorting-view.js';
import NoPointView from '../view/no-point-view.js';
import LoadingView from '../view/loading-view.js';
import NoAdditionalInfoView from '../view/no-additional-info-view.js';
import PointPresenter from './point-presenter.js';
import PointNewPresenter from './point-new-presenter.js';
import { sorting } from '../utils/sorting.js';
import { filter } from '../utils/filter.js';
import { UpdateType, UserAction, SortType, FilterType, TimeLimit } from '../const.js';
import TripInfoPresenter from './trip-info-presenter.js';

export default class BoardPresenter {
  #containerTripInformation = null;
  #containerTrip = null;

  #modelPoints = null;
  #modelDestinations = null;
  #modelOffers = null;
  #modelFilter = null;

  #componentNoPoint = null;
  #componentSort = null;
  #componentPointsList = new PointsListView();
  #componentLoading = new LoadingView();
  #componentNoSecondaryInformation = new NoAdditionalInfoView();

  #presenterPoint = new Map();
  #presenterNewPoint = null;
  #presenterTripInformation = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor({tripInfoContainer, tripContainer, pointsModel, filterModel, destinationsModel, offersModel}) {
    this.#containerTripInformation = tripInfoContainer;
    this.#containerTrip = tripContainer;
    this.#modelPoints = pointsModel;
    this.#modelFilter = filterModel;
    this.#modelDestinations = destinationsModel;
    this.#modelOffers = offersModel;


    this.#presenterNewPoint = new PointNewPresenter({
      pointListContainer: this.#componentPointsList.element,
      changeData: this.#handleViewAction,
      destinationsModel: this.#modelDestinations,
      offersModel: this.#modelOffers
    });

    this.#modelDestinations.addObserver(this.#handleModelEvent);
    this.#modelOffers.addObserver(this.#handleModelEvent);
    this.#modelPoints.addObserver(this.#handleModelEvent);
    this.#modelFilter.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#modelFilter.filter;
    const locations = this.#modelPoints.points;
    const filteredLocations = filter[this.#filterType](locations);

    sorting[this.#currentSortType](filteredLocations);
    return filteredLocations;
  }

  init() {
    this.#renderBoard();
  }

  makePoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#modelFilter.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    if (this.#componentNoPoint) {
      render(this.#componentPointsList, this.#containerTrip);
    }
    this.#presenterNewPoint.init(callback);
  };

  #renderSort = () => {
    this.#componentSort = new SortingView(this.#currentSortType);
    this.#componentSort.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#componentSort, this.#containerTrip, RenderPosition.AFTERBEGIN);
  };

  #renderTripInfo = () => {
    this.#presenterTripInformation = new TripInfoPresenter(this.#containerTripInformation, this.#modelDestinations, this.#modelOffers);
    const sortedPoints = sorting[SortType.DAY](this.points);
    this.#presenterTripInformation.init(sortedPoints);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#componentPointsList.element,
      changeData: this.#handleViewAction,
      changeMode: this.#handleModeChange,
      destinationsModel: this.#modelDestinations,
      offersModel: this.#modelOffers
    });
    pointPresenter.init(point);
    this.#presenterPoint.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderLoading = () => {
    render(this.#componentLoading, this.#containerTrip, RenderPosition.AFTERBEGIN);
  };

  #renderNoAdditionalInfo = () => {
    render(this.#componentNoSecondaryInformation, this.#containerTrip, RenderPosition.AFTERBEGIN);
  };

  #renderNoPoints = () => {
    this.#componentNoPoint = new NoPointView(this.#filterType);
    render(this.#componentNoPoint, this.#containerTrip, RenderPosition.AFTERBEGIN);
  };

  #renderPointList = (points) => {
    render(this.#componentPointsList, this.#containerTrip);
    this.#renderPoints(points);
  };

  #clearTripInfo = () => {
    this.#presenterTripInformation.destroy();
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#presenterNewPoint.destroy();
    this.#presenterPoint.forEach((presenter) => presenter.destroy());
    this.#presenterPoint.clear();

    remove(this.#componentSort);
    remove(this.#componentLoading);

    if (this.#componentNoPoint) {
      remove(this.#componentNoPoint);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#modelOffers.offers.length === 0 || this.#modelOffers.isSuccessfulLoading === false ||
      this.#modelDestinations.destinations.length === 0 || this.#modelDestinations.isSuccessfulLoading === false ||
      this.#modelPoints.isSuccessfulLoading === false) {
      this.#renderNoAdditionalInfo();
      return;
    }

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderPointList(points);
    this.#renderSort();
  };

  #handleModeChange = () => {
    this.#presenterNewPoint.destroy();
    this.#presenterPoint.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#presenterPoint.get(update.id).setSaving();
        try {
          await this.#modelPoints.updatePoint(updateType, update);
        } catch(err) {
          this.#presenterPoint.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#presenterNewPoint.setSaving();
        try {
          await this.#modelPoints.addPoint(updateType, update);
        } catch(err) {
          this.#presenterNewPoint.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#presenterPoint.get(update.id).setDeleting();
        try {
          await this.#modelPoints.deletePoint(updateType, update);
        } catch(err) {
          this.#presenterPoint.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#presenterPoint.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#clearTripInfo();
        this.#renderTripInfo();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#componentLoading);
        this.#renderBoard();
        this.#renderTripInfo();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
