import React from "react";
import {
  StyledHeader,
  // LocationWrapper,
  // LocationName,
  HeaderIcon,
  Navigation,
  NavigationLink,
  Title,
} from "./styled-header";
import userIcon from "../../assets/images/user-icon.svg";
// import locationIcon from "../../assets/images/location.svg";

const Header = () => {
  return (
    <StyledHeader>
      <Navigation>
        <div>
          <NavigationLink to="/">List</NavigationLink>
          <NavigationLink to="/development">History</NavigationLink>
        </div>
        <Title to="/">Car share</Title>

        <div to="/development">
          <p>UserName</p>
          <HeaderIcon src={userIcon} alt="user menu" />
        </div>
      </Navigation>
    </StyledHeader>
  );
};

export default Header;
