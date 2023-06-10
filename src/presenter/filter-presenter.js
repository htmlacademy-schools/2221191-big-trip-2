import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { filter } from '../utils/filter.js';
import { FilterType, UpdateType } from '../const.js';

export default class FilterPresenter {
<<<<<<< HEAD
  #containerFilter = null;
=======
  #filterContainer = null;

  #filterModel = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
>>>>>>> master

  #modelFilter = null;
  #modelPoints = null;
  #modelOffers = null;
  #modelDestinations = null;

<<<<<<< HEAD
  #componentFilter = null;
=======
  constructor({filterContainer, pointsModel, destinationsModel, offersModel, filterModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
>>>>>>> master

  constructor({filterContainer, pointsModel, destinationsModel, offersModel, filterModel}) {
    this.#containerFilter = filterContainer;
    this.#modelFilter = filterModel;
    this.#modelPoints = pointsModel;
    this.#modelDestinations = destinationsModel;
    this.#modelOffers = offersModel;

    this.#modelPoints.addObserver(this.#handleModelEvent);
    this.#modelFilter.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#modelPoints.points;

    return [
      {
        type: FilterType.EVERYTHING,
        name: FilterType.EVERYTHING,
        count: filter[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.PAST,
        name: FilterType.PAST,
        count: filter[FilterType.PAST](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: FilterType.FUTURE,
        count: filter[FilterType.FUTURE](points).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#componentFilter;

    this.#componentFilter = new FilterView(filters, this.#modelFilter.filter);
    this.#componentFilter.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#componentFilter, this.#containerFilter);
      return;
    }

    replace(this.#componentFilter, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
<<<<<<< HEAD
    if (this.#modelOffers.offers.length === 0 || this.#modelOffers.isSuccessfulLoading === false ||
      this.#modelDestinations.destinations.length === 0 || this.#modelDestinations.isSuccessfulLoading === false ||
      this.#modelPoints.isSuccessfulLoading === false) {
=======
    if (this.#offersModel.offers.length === 0 || this.#offersModel.isSuccessfulLoading === false ||
      this.#destinationsModel.destinations.length === 0 || this.#destinationsModel.isSuccessfulLoading === false ||
      this.#pointsModel.isSuccessfulLoading === false) {
>>>>>>> master
      return;
    }
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#modelFilter.filter === filterType) {
      return;
    }

    this.#modelFilter.setFilter(UpdateType.MAJOR, filterType);
  };
}
