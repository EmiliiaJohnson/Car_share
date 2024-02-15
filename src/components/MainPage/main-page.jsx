import React, { useEffect } from "react";
import "./main-page.scss";
import { observer } from "mobx-react-lite";

import store from "../../store/store";

const MainPage = observer(() => {
  document.title = "Car Share";
  useEffect(() => {
    store.getCarsList();
  }, []);

  return (
    <>
      <div className="cars-list">
        {store.isLoading
          ? "Loading..."
          : store.carsList.map((car, index) => (
              <div className="car-card" key={index}>
                <img className="car-image" src={car.imageUrls[0]} alt="car" />
                <div className="car-info">
                  <p>{car.name}</p>
                  <p className="car-price">
                    {car.price.amount}
                    {car.price.currencyCode} /
                    {car.price.priceType === "PER_DAY" ? "day" : "hour"}
                  </p>
                  <div className="car-owner">
                    <img
                      className="car-owner_icon"
                      src={car.owner.avatarUrl}
                      alt="car owner"
                    />
                    <p>{car.owner.name}</p>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <aside className="filters"></aside>
    </>
  );
});

export default MainPage;
