import axios from "axios";

export const API = "http://185.253.75.46/";
export const carTypes = [
  "SUV",
  "SEDAN",
  "HATCHBACK",
  "MPV",
  "WAGON",
  "CROSSOVER",
  "COUPE",
  "CONVERTIBLE",
  "PICKUP",
  "SUPERCAR",
];
const { makeAutoObservable } = require("mobx");

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading = false;
  setLoading = (boolean) => {
    this.isLoading = boolean;
  };

  isError = false;
  setError = (boolean) => {
    this.isLoading = boolean;
  };

  carsList = [];
  setCarsList = (list) => {
    this.carsList = list;
  };

  priceRangeType;
  setPriceRangeType = (type) => {
    this.priceRangeType = type;
  };

  setWordToLowerCase = (word) => {
    return word[0] + word.slice(1).toLowerCase();
  };

  getCarsList = () => {
    this.setLoading(true);
    axios
      .post(API + "carsList", {
        pageSize: 10,
      })
      .then((response) => {
        this.setError(false);
        this.setCarsList(response.data.response.result);
        this.setLoading(false);
      })
      .catch((err) => {
        this.setError(true);
        console.log(err);

        this.setLoading(false);
      });
  };

  getPriceRange = (location) => {
    axios
      .post(API + "priceRange", {
        location: location,
      })
      .then((response) => {
        this.setError(false);
        this.setPriceRangeType(response.data.response);
      })
      .catch((err) => {
        console.log(err);
        this.setError(true);
      });
  };
}

let store = new Store();
export default store;
