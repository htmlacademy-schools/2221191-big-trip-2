import Observable from '../framework/observable.js';

export default class OffersModel extends Observable{
  #offers = [];
  #offersApiService = null;

  constructor(offersApiService) {
    super();
    this.#ApiServOffers = offersApiService;
  }

  init = async () => {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch(err) {
      this.#isSucceedLoading = false;
      this.#offers = [];
      this.#isSuccessfulLoading = false;
    }
  };

  get offers() {
    return this.#offers;
  }
}

