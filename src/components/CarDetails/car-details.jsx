import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import store from "../../store/store";

const CarDetails = observer(() => {
  const { id } = useParams();
  const car = store.carsList.find((car) => car.id === id);

  useEffect(() => {
    store.getCarsList();
  }, []);

  return (
    <div>
      {store.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {!car ? (
            <h1>Car not found</h1>
          ) : (
            <div>
              <h1>{car.name}</h1>
              <img src={car.imageUrls[0]} alt="car" />
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default CarDetails;
