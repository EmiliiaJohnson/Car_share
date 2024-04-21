import React from "react";
import {
  StyledHeader,
  HeaderIcon,
  Navigation,
  NavigationLink,
  Title,
} from "./styled-header";
import userIcon from "../../assets/images/user-icon.svg";

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
