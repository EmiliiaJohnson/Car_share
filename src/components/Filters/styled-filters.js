import styled from "styled-components";
import { Select, Radio, Checkbox, FormControlLabel } from "@mui/material";

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
