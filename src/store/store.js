import axios from "axios";

export const API = "http://185.253.75.46/";
const { makeAutoObservable } = require("mobx");

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading = false;
  setLoading = (boolean) => {
    this.isLoading = boolean;
  };

  carsList = [];
  setCarsList = (list) => {
    this.carsList = list;
  };

  getCarsList = () => {
    this.setLoading(true);
    axios
      .post(API + "carsList", {
        pageSize: 10,
      })
      .then((response) => {
        this.setCarsList(response.data.response.result);
        console.log(response.data.response.result);
        this.setLoading(false);
      })
      .catch((err) => {
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
        console.log(response.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

let store = new Store();
export default store;
