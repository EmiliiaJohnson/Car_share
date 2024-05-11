import styled from "styled-components";
import {
  Select,
  Radio,
  Checkbox,
  FormControlLabel,
  MenuItem,
  ListItemIcon,
} from "@mui/material";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 16px;
  background-color: #fff;
`;

export const Title = styled.h3`
  font-family: var(--gilroy-bold);
  font-size: 30px;
`;

export const StyledSelect = styled(Select)`
  & .MuiOutlinedInput-notchedOutline {
    border: none;
    border-radius: 16px;
  }
  & .MuiSvgIcon-root {
    color: var(--primary-color);
    font-size: 35px;
    transition: all 0.4s ease;
  }
  & .MuiListItemIcon-root {
    display: none;
  }

  & .MuiSelect-select {
    font-size: 20px;
    font-family: var(--gilroy-semibold);
    padding: 16px 0;
  }
`;

export const StyledRadio = styled(Radio)`
  &.Mui-checked {
    color: var(--primary-color) !important;
  }
  &.MuiFormControlLabel-label {
    font-size: 14px;
    font-family: var(--gilroy-semibold);
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  & .MuiSvgIcon-root {
    color: var(--primary-color);
    border-radius: 4px;
  }
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    font-size: 14px;
    font-family: var(--gilroy-medium);
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    font-family: var(--gilroy-regular);
    height: 50px;
    display: grid;
    grid-template-columns: repeat(1, 1fr 4fr 3fr);
    position: relative;
    &::after {
      content: "";
      position: absolute;
      height: 1px;
      background: #f0f0f0;
      top: 100%;
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    }
  }
  &&.Mui-selected {
    background-color: #fff;
  }
`;

export const StyledListItemIcon = styled(ListItemIcon)`
  &.MuiListItemIcon-root {
    color: var(--primary-color);
    min-width: auto !important;
    justify-self: flex-end;
  }
`;
