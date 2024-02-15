import React from "react";
import "./header.scss";
import userIcon from "../../assets/images/user-icon.svg";
import locationIcon from "../../assets/images/location.svg";

const MainPage = () => {
  return (
    <header>
      {/* Link to location change */}
      <div className="location-wrapper">
        <img className="header-icon" src={locationIcon} alt="location" />
        <p className="location">Yerevan</p>
      </div>
      <h1>Car share</h1>
      {/* Link to user menu */}
      <img className="header-icon" src={userIcon} alt="user menu" />
    </header>
  );
};

export default MainPage;
