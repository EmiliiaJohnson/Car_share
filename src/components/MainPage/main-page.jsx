import React, { useEffect } from "react";
import "./main-page.scss";
import Loader from "../UI-Components/Loader/loader";
import locationIcon from "../../assets/images/location.svg";
import { observer } from "mobx-react-lite";

import store from "../../store/store";

const MainPage = observer(() => {
  document.title = "Car Share";
  useEffect(() => {
    store.getCarsList();
  }, []);

  const getCurrencyCode = (currencyCode) => {
    switch (currencyCode) {
      case "AMD":
        return "֏";
      case "RUB":
        return "₽";
      case "USD":
        return "$";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="cars-list">
        {store.isLoading ? (
          <Loader />
        ) : (
          store.carsList.map((car, index) => (
            <div className="car-card" key={index}>
              <img className="car-image" src={car.imageUrls[0]} alt="car" />
              <div className="car-info">
                <p>{car.name}</p>
                <p className="car-price">
                  {car.price.amount}
                  {getCurrencyCode(car.price.currencyCode)}/
                  {car.price.priceType === "PER_DAY" ? "day" : "hour"}
                </p>
                <div className="car-owner">
                  <div className="car-owner_details">
                    <img
                      className="car-owner_icon"
                      src={car.owner.avatarUrl}
                      alt="car owner"
                    />
                    <p className="car-owner_name car-owner-p">
                      {car.owner.name}
                    </p>
                  </div>
                  <div className="car-owner_details">
                    <img src={locationIcon} alt="location" />
                    <p className="car-owner_location car-owner-p">
                      {car.location.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <aside className="filters"></aside>
    </>
  );
});

export default MainPage;
