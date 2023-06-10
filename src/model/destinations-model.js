import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinations = [];
  #destinationsApiService = null;

  constructor(destinationsApiService) {
    super();
    this.#apiServDestinations = destinationsApiService;
  }

  init = async () => {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
    } catch(err) {
      this.#isSucceedlLoading = false;
      this.#destinations = [];
      this.#isSuccessfulLoading = false;
    }
  };

  get destinations() {
    return this.#destinations;
  }
}

