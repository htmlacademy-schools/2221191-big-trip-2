import Observable from '../framework/observable.js';

export default class OffersModel extends Observable{
  #offers = [];
  #ApiServOffers = null;
  #isSucceedLoading = false;

  constructor(offersApiService) {
    super();
    this.#ApiServOffers = offersApiService;
  }

  init = async () => {
    try {
      this.#isSucceedLoading = true;
      this.#offers = await this.#ApiServOffers.offers;
    } catch(err) {
      this.#isSucceedLoading = false;
      this.#offers = [];
    }
  };

  get offers() {
    return this.#offers;
  }

  get isSucceedLoading() {
    return this.#isSucceedLoading;
  }
}
