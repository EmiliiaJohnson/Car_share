import axios from "axios";

export const API = "http://185.253.75.46/";
export const cities = {
  All: "",
  Yerevan: "Yerevan",
  Gyumri: "Gyumri",
  Samara: "Samara",
};
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
export const carFeatures = [
  "GPS",
  "ABS",
  "PARKTRONIC",
  "BLIND_SPOT_MONITORING",
  "DASH_CAMERA",
  "ALL_WHEEL_DRIVE",
  "NAVIGATION_SYSTEM",
  "HEATING_OF_SEATS",
  "CENTRAL_LOCK",
  "BLUETOOTH",
  "REMOTE_START",
  "ANDROID_AUTO",
  "APPLE_CAR_PLAY",
  "CHILD_CAR_SEAT",
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
    return word[0] + word.slice(1).toLowerCase().replace(/_/g, " ");
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

  getPriceRange = () => {
    axios
      .get(API + "priceRange")
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
