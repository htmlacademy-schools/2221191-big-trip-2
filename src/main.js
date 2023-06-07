// hi:)
import { render } from './framework/render.js';
import FiltersView from './view/filters-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import SiteMenuView from './view/site-menu-view.js';
import PointsModel from './model/point-model.js';
import { getPoints, getDestinations, getOffersByType } from './mock/point.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const tripPresenter = new TripEventsPresenter(siteMainElement.querySelector('.trip-events'));

const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();

render(new FiltersView(), siteHeaderElement.querySelector('.trip-controls__filters'));
render(new SiteMenuView(), siteHeaderElement.querySelector('.trip-controls__navigation'));

pointsModel.init(points, destinations, offersByType);
tripPresenter.init(pointsModel);
