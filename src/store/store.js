import axios from "axios";

const API = "http://185.253.75.46/";
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
        filters: {
          location: "Yerevan",
        },
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
}

let store = new Store();
export default store;
