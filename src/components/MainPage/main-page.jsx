import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Loader from "../UI-Components/Loader/loader";
import Filters from "../Filters/filters.jsx";
import locationImg from "../../assets/images/location.svg";
import CarTypeImg from "../../assets/images/car-type.svg";
import TransmissionTypeImg from "../../assets/images/transmission.svg";
import SeatsAmount from "../../assets/images/car-seat-amount.svg";
import store from "../../store/store.js";
import {
  CarsList,
  CarCard,
  CarName,
  ImgWrapper,
  CarImg,
  CarInfo,
  CarOwner,
  CarOwnerDetails,
  CarOwnerIcon,
  CarOwnerLocationIcon,
  CarOwnerInfo,
  CarDetails,
  CarType,
  CarDetailsIcon,
  CarDetailsCarIcon,
  Aside,
} from "./styled-main-page.js";

const MainPage = observer(() => {
  useEffect(() => {
    store.getCarsList();
  }, []);

  const getTransmissionType = (transmission) => {
    switch (transmission) {
      case "AUTO":
        return "AT";
      case "MANUAL":
        return "MT";
      case "OTHER":
        return "Other";
      default:
        return "unknown";
    }
  };

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
      <CarsList>
        {store.isLoading ? (
          <Loader />
        ) : (
          store.carsList.map((car) => (
            <CarCard to={`/cars/${car.id}`} key={car.id}>
              <ImgWrapper>
                <CarImg src={car.imageUrls[0]} alt="car" />
              </ImgWrapper>

              <CarInfo>
                <CarName>{car.name}</CarName>
                <p>
                  {car.price.amount}
                  {getCurrencyCode(car.price.currencyCode)}/
                  {car.price.priceType === "PER_DAY" ? "day" : "hour"}
                </p>

                <CarDetails>
                  <CarType>
                    <CarDetailsCarIcon src={CarTypeImg} alt="car type" />
                    <p>{store.setWordToLowerCase(car.carType)}</p>
                  </CarType>
                  <CarType>
                    <CarDetailsIcon src={SeatsAmount} alt="car seats" />
                    <p>{car.numberOfSeats}</p>
                  </CarType>
                  <CarType>
                    <CarDetailsIcon
                      src={TransmissionTypeImg}
                      alt="transmission type"
                    />
                    <p>{getTransmissionType(car.transmissionType)}</p>
                  </CarType>
                </CarDetails>

                <CarOwnerDetails>
                  <CarOwner>
                    <CarOwnerIcon src={car.owner.avatarUrl} />
                    <CarOwnerInfo>{car.owner.name}</CarOwnerInfo>
                  </CarOwner>
                  <CarOwner>
                    <CarOwnerLocationIcon src={locationImg} alt="location" />
                    <CarOwnerInfo>{car.location.location}</CarOwnerInfo>
                  </CarOwner>
                </CarOwnerDetails>
              </CarInfo>
            </CarCard>
          ))
        )}
      </CarsList>
      <Aside>
        <Filters />
      </Aside>
    </>
  );
});

export default MainPage;
