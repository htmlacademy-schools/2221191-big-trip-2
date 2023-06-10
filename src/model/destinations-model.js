import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinations = [];
  #apiServDestinations = null;
  #isSucceedlLoading = false;

  constructor(destinationsApiService) {
    super();
    this.#apiServDestinations = destinationsApiService;
  }

  init = async () => {
    try {
      this.#isSucceedlLoading = true;
      this.#destinations = await this.#apiServDestinations.destinations;
    } catch(err) {
      this.#isSucceedlLoading = false;
      this.#destinations = [];
    }
  };

  get destinations() {
    return this.#destinations;
  }

  get isSucceedLoading() {
    return this.#isSucceedlLoading;
  }
}
