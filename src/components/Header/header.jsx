import React from "react";
import {
  StyledHeader,
  LocationWrapper,
  HeaderIcon,
  LocationName,
  Navigation,
  NavigationLink,
  Title,
} from "./styled-header";
import userIcon from "../../assets/images/user-icon.svg";
import locationIcon from "../../assets/images/location.svg";

const Header = () => {
  return (
    <StyledHeader>
      <Navigation>
        {/* Link to location change */}
        <LocationWrapper>
          <HeaderIcon src={locationIcon} alt="location" />
          <LocationName>Yerevan</LocationName>
        </LocationWrapper>
        <div>
          <NavigationLink to="/main">List</NavigationLink>
          <NavigationLink to="/development">History</NavigationLink>
        </div>
        <Title to="/main">Car share</Title>
        {/* <NavigationLink to="/development">
          <p>UserName</p>
          <HeaderIcon src={userIcon} alt="user menu" />
        </NavigationLink> */}
        <div to="/development">
          <p>UserName</p>
          <HeaderIcon src={userIcon} alt="user menu" />
        </div>
      </Navigation>
    </StyledHeader>
  );
};

export default Header;
