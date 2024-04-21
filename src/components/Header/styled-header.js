import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  font-family: var(--gilroy-medium);
  height: 90px;
  padding: 20px 40px;
  position: sticky;
  top: 0;
  border-radius: 0px 0px 16px 16px;
  background: #ffffffa1;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.13);
  text-align: center;
  z-index: 1;
  backdrop-filter: blur(15px);
`;

export const HeaderIcon = styled.img`
  height: 35px;
  width: 35px;
  margin: auto;
`;

export const Navigation = styled.nav`
  display: grid;
  grid-template-columns: repeat(1, 4fr 7fr 4fr);
  align-items: center;
  width: 100%;
`;

export const NavigationLink = styled(NavLink)`
  font-size: 24px;
  font-family: var(--gilroy-regular);
  margin: 0 20px;
  color: #000;
  text-decoration: none;
  padding-bottom: 31px;
  &:hover {
    color: var(--primary-color);
  }
  &.active {
    font-family: var(--gilroy-semibold);
    color: var(--primary-color);
    border-bottom: var(--primary-color) 2px solid;
  }
`;

export const Title = styled(NavigationLink)`
  font-size: 40px;
  font-family: var(--gilroy-bold);
  padding: 0;
  &:hover {
    color: #000;
  }
  &.active {
    color: #000;
    font-family: var(--gilroy-bold);
    border-bottom: none;
  }
`;
