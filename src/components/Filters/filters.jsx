import React, { useState, useEffect } from "react";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import {
  Box,
  Slider,
  FormControlLabel,
  FormControl,
  RadioGroup,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import {
  Form,
  Title,
  StyledSelect,
  StyledRadio,
  StyledFormControlLabel,
  StyledCheckbox,
  StyledMenuItem,
  StyledListItemIcon,
  StyledFormLabel,
  StyledButton,
} from "./styled-filters.js";
import line from "../../assets/images/line.svg";
import carType from "../../assets/images/car-type.svg";
import axios from "axios";
import store from "../../store/store";
import { API, cities, carTypes, carFeatures } from "../../store/store";

const Filters = () => {
  useEffect(() => {
    store.getPriceRange();
  });

  const [filterItems, setFilterItems] = useState({
    location: "",
    price: {
      priceType: "PER_DAY, PER_HOUR",
      priceRange: {
        from: 100,
        to: 1000000,
      },
      sortingOrder: "LOW_TO_HIGH",
      currencyCode: "AMD",
    },
    carTypes: [],
    features: [],
    transmissionTypes: ["MANUAL", "AUTO", "OTHER"],
  });

  let onlyOnepriceTypeIsChecked =
    !filterItems.price.priceType.includes("PER_DAY, PER_HOUR") &&
    !filterItems.price.priceType.includes("PER_HOUR, PER_DAY");

  const setPriceRange = (priceData) => {
    const selectedPriceType =
      filterItems.price.priceType === "PER_DAY" ? "PER_DAY" : "PER_HOUR";
    if (!priceData[selectedPriceType]) {
      console.error(`No price data found for ${selectedPriceType}`);
      const availablePriceType = Object.keys(priceData)[0];
      setFilterItems((prevFilters) => ({
        ...prevFilters,
        price: {
          ...prevFilters.price,
          priceType: availablePriceType,
        },
      }));
      return;
    }

    setFilterItems((prevFilters) => ({
      ...prevFilters,
      price: {
        ...prevFilters.price,
        priceRange: {
          from: priceData[selectedPriceType].from,
          to: priceData[selectedPriceType].to,
        },
      },
    }));
  };

  const handleChange = (e) => {
    setPriceRange(store.priceRangeType);
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "priceType") {
        if (!checked && filterItems.price.priceType.split(", ").length === 1) {
          return;
        }
        setFilterItems((prevFilters) => ({
          ...prevFilters,
          price: {
            ...prevFilters.price,
            priceType: checked
              ? prevFilters.price.priceType +
                (prevFilters.price.priceType ? ", " : "") +
                value
              : prevFilters.price.priceType
                  .split(", ")
                  .filter((item) => item !== value)
                  .join(", "),
          },
        }));
      } else if (name === "carTypes") {
        if (checked) {
          setFilterItems((prevFilters) => ({
            ...prevFilters,
            carTypes: [...prevFilters.carTypes, value],
          }));
        } else {
          setFilterItems((prevFilters) => ({
            ...prevFilters,
            carTypes: prevFilters.carTypes.filter((item) => item !== value),
          }));
        }
      } else if (name === "features") {
        if (checked) {
          setFilterItems((prevFilters) => ({
            ...prevFilters,
            features: [...prevFilters.features, value],
          }));
        } else {
          setFilterItems((prevFilters) => ({
            ...prevFilters,
            features: prevFilters.features.filter((item) => item !== value),
          }));
        }
      } else if (name === "transmission") {
        if (checked) {
          setFilterItems((prevFilters) => ({
            ...prevFilters,
            transmissionTypes: [value],
          }));
        } else {
          setFilterItems((prevFilters) => ({
            ...prevFilters,
            transmissionTypes: ["MANUAL", "AUTO", "OTHER"],
          }));
        }
      }
    } else if (type === "radio") {
      setFilterItems((prevFilters) => ({
        ...prevFilters,
        price: {
          ...prevFilters.price,
          sortingOrder: value,
        },
      }));
    } else {
      setFilterItems((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };
  const handleSliderChange = (values) => {
    setFilterItems((prevFilters) => ({
      ...prevFilters,
      price: {
        ...prevFilters.price,
        priceRange: {
          from: values.target.value[0],
          to: values.target.value[1],
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    console.log(filterItems);
    e.preventDefault();
    let filters = { ...filterItems };
    store.setLoading(true);
    if (!filters.location) {
      delete filters.location;
    }
    if (!filters.price.sortingOrder) {
      delete filters.price.sortingOrder;
    }
    if (
      filters.price.priceType === "PER_DAY, PER_HOUR" ||
      filters.price.priceType === "PER_HOUR, PER_DAY"
    ) {
      delete filters.price;
    }
    if (!filters.carTypes.length) {
      delete filters.carTypes;
    }
    if (!filters.features.length) {
      delete filters.features;
    }

    if (Object.keys(filters).length === 0 && filters.constructor === Object) {
      filters = null;
    }
    axios
      .post(API + "carsList", {
        pageSize: 10,
        filters,
      })
      .then((response) => {
        store.setCarsList(response.data.response.result);
        console.log("filter", response.data.response.result);
        store.setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        store.setLoading(false);
      });
  };
  return (
    <Form method="post" onSubmit={handleSubmit}>
      <Title>Filters</Title>
      <StyledFormLabel>Location</StyledFormLabel>
      <StyledSelect
        IconComponent={KeyboardArrowDownRoundedIcon}
        value={filterItems.location}
        name="location"
        onChange={handleChange}
        displayEmpty
        MenuProps={{
          MenuListProps: {
            disablePadding: true,
          },
          sx: {
            "& .MuiPaper-root ": {
              borderRadius: "16px",
            },
          },
        }}
      >
        {Object.entries(cities).map(([cityName, cityValue]) => (
          <StyledMenuItem key={cityName} value={cityValue}>
            <ListItemIcon>
              <LocationOnRoundedIcon sx={{ color: "var(--primary-color)" }} />
            </ListItemIcon>
            {cityName}
            {filterItems.location === cityValue && (
              <StyledListItemIcon>
                <DoneRoundedIcon />
              </StyledListItemIcon>
            )}
          </StyledMenuItem>
        ))}
      </StyledSelect>
      <img src={line} alt="" />
      <StyledFormLabel>Price</StyledFormLabel>
      <StyledFormControlLabel
        label="Per day"
        control={
          <StyledCheckbox
            name="priceType"
            value="PER_DAY"
            checked={filterItems.price.priceType.includes("PER_DAY")}
            disabled={filterItems.price.priceType === "PER_DAY"}
            onChange={handleChange}
          />
        }
      />
      <StyledFormControlLabel
        label="Per hour"
        control={
          <StyledCheckbox
            name="priceType"
            value="PER_HOUR"
            checked={filterItems.price.priceType.includes("PER_HOUR")}
            disabled={filterItems.price.priceType === "PER_HOUR"}
            onChange={handleChange}
          />
        }
      />
      <Collapse in={onlyOnepriceTypeIsChecked}>
        <Box>
          <Slider
            sx={{
              color: "var(--primary-color)",
              width: "90%",
              marginLeft: "10px",
            }}
            step={100}
            value={[
              filterItems.price.priceRange.from,
              filterItems.price.priceRange.to,
            ]}
            onChange={handleSliderChange}
            min={
              (
                (onlyOnepriceTypeIsChecked &&
                  store.priceRangeType[filterItems.price.priceType]) ||
                {}
              ).from || 0
            }
            max={
              (
                (onlyOnepriceTypeIsChecked &&
                  store.priceRangeType[filterItems.price.priceType]) ||
                {}
              ).to || 1000000
            }
            valueLabelDisplay="auto"
          />
        </Box>
        <FormControl>
          <StyledFormLabel>Sorting order</StyledFormLabel>
          <RadioGroup defaultValue="LOW_TO_HIGH" onChange={handleChange}>
            <FormControlLabel
              value="LOW_TO_HIGH"
              control={<StyledRadio />}
              label="Low to high"
            />
            <FormControlLabel
              value="HIGH_TO_LOW"
              control={<StyledRadio />}
              label="High to low"
            />
          </RadioGroup>
        </FormControl>
      </Collapse>
      <img src={line} alt="" />
      <StyledFormLabel>Car Types</StyledFormLabel>
      <div role="group" aria-labelledby="rank">
        <List
          orientation="horizontal"
          wrap
          sx={{
            "--List-gap": "8px",
            "--ListItem-radius": "20px",
            "--ListItem-minHeight": "32px",
            "--ListItem-gap": "4px",
          }}
        >
          {carTypes.map((item) => (
            <ListItem key={item}>
              <Checkbox
                name="carTypes"
                style={{
                  fontFamily: "var(--gilroy-medium)",
                  color: "#000",
                }}
                disableIcon
                overlay
                label={store.setWordToLowerCase(item)}
                value={item}
                checked={filterItems.carTypes.includes(item)}
                onChange={handleChange}
                variant={
                  filterItems.carTypes.includes(item) ? "soft" : "outlined"
                }
                slotProps={{
                  action: ({ checked }) => ({
                    sx: checked
                      ? {
                          height: "32px",
                          border: "none",
                          backgroundColor: "var(--secondary-color)",
                          "&:hover": {
                            backgroundColor: "var(--secondary-color)",
                          },
                        }
                      : {
                          height: "32px",
                          border: "1px solid var(--primary-color)",
                        },
                  }),
                }}
              />
              {filterItems.carTypes.includes(item) && (
                <CheckCircleRoundedIcon
                  style={{ color: "var(--primary-color)", marginRight: "-7px" }}
                  sx={{ ml: -0.5, zIndex: 2, pointerEvents: "none" }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </div>
      <img src={line} alt="" />
      <StyledFormLabel>Features</StyledFormLabel>
      <div role="group" aria-labelledby="rank">
        <List
          orientation="horizontal"
          wrap
          sx={{
            "--List-gap": "8px",
            "--ListItem-radius": "20px",
            "--ListItem-minHeight": "32px",
            "--ListItem-gap": "4px",
          }}
        >
          {carFeatures.map((item) => (
            <ListItem key={item}>
              <Checkbox
                name="features"
                style={{
                  fontFamily: "var(--gilroy-medium)",
                  color: "#000",
                }}
                disableIcon
                overlay
                label={store.setWordToLowerCase(item)}
                value={item}
                checked={filterItems.features.includes(item)}
                onChange={handleChange}
                variant={
                  filterItems.features.includes(item) ? "soft" : "outlined"
                }
                slotProps={{
                  action: ({ checked }) => ({
                    sx: checked
                      ? {
                          height: "32px",
                          border: "none",
                          backgroundColor: "var(--secondary-color)",
                          "&:hover": {
                            backgroundColor: "var(--secondary-color)",
                          },
                        }
                      : {
                          height: "32px",
                          border: "1px solid var(--primary-color)",
                        },
                  }),
                }}
              />
              {filterItems.features.includes(item) && (
                <CheckCircleRoundedIcon
                  style={{ color: "var(--primary-color)", marginRight: "-7px" }}
                  sx={{ ml: -0.5, zIndex: 2, pointerEvents: "none" }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </div>
      <img src={line} alt="" />
      <StyledFormLabel>Transmission</StyledFormLabel>
      <StyledFormControlLabel
        label="Automatic only"
        control={
          <StyledCheckbox
            name="transmission"
            value="AUTO"
            onChange={handleChange}
          />
        }
      />

      <StyledButton type="submit">Apply filters</StyledButton>
    </Form>
  );
};

export default Filters;
