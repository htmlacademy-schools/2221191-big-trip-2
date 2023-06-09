import Observable from '../framework/observable.js';

export default class OffersModel extends Observable{
  #offers = [];
  #offersApiService = null;
  #isSuccessfulLoading = false;

  constructor(offersApiService) {
    super();
    this.#offersApiService = offersApiService;
  }

  init = async () => {
    try {
      this.#offers = await this.#offersApiService.offers;
      this.#isSuccessfulLoading = true;
    } catch(err) {
      this.#offers = [];
      this.#isSuccessfulLoading = false;
    }
  };

  get offers() {
    return this.#offers;
  }

  get isSuccessfulLoading() {
    return this.#isSuccessfulLoading;
  }
}
