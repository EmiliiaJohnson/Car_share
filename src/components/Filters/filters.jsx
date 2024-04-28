import React, { useState, useEffect } from "react";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Box,
  Slider,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { Form, Title } from "./styled-filters.js";
import axios from "axios";
import store from "../../store/store";
import { API, carTypes } from "../../store/store";

const Filters = () => {
  useEffect(() => {
    store.getPriceRange(filterItems.location);
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
  });

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
      <InputLabel>Location</InputLabel>
      <Select
        value={filterItems.location}
        name="location"
        onChange={handleChange}
        input={<OutlinedInput label="Location" />}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Yerevan">Yerevan</MenuItem>
        <MenuItem value="Gyumri">Gyumri</MenuItem>
        <MenuItem value="Samara">Samara</MenuItem>
      </Select>
      Price
      <FormControlLabel
        label="Per day"
        control={
          <Checkbox
            sx={{
              "& .MuiSvgIcon-root": {
                backgroundColor: "var(--primary-color)",
                borderRadius: "4px",
              },
            }}
            size="sm"
            name="priceType"
            value="PER_DAY"
            checked={filterItems.price.priceType.includes("PER_DAY")}
            disabled={filterItems.price.priceType === "PER_DAY"}
            onChange={handleChange}
          />
        }
        sx={{
          "& .MuiFormControlLabel-label": {
            fontSize: 14,
            fontFamily: "var(--gilroy-medium)",
          },
        }}
      />
      <FormControlLabel
        label="Per hour"
        control={
          <Checkbox
            sx={{
              "& .MuiSvgIcon-root": {
                backgroundColor: "var(--primary-color)",
                borderRadius: "4px",
              },
            }}
            size="sm"
            name="priceType"
            value="PER_HOUR"
            checked={filterItems.price.priceType.includes("PER_HOUR")}
            disabled={filterItems.price.priceType === "PER_HOUR"}
            onChange={handleChange}
          />
        }
        sx={{
          "& .MuiFormControlLabel-label": {
            fontSize: 14,
            fontFamily: "var(--gilroy-medium)",
          },
        }}
      />
      {!filterItems.price.priceType.includes("PER_DAY, PER_HOUR") &&
        !filterItems.price.priceType.includes("PER_HOUR, PER_DAY") && (
          <div>
            <Box>
              <Slider
                sx={{
                  color: "var(--primary-color)",
                }}
                step={100}
                value={[
                  filterItems.price.priceRange.from,
                  filterItems.price.priceRange.to,
                ]}
                onChange={handleSliderChange}
                min={
                  (store.priceRangeType[filterItems.price.priceType] || {})
                    .from || 0
                }
                max={
                  (store.priceRangeType[filterItems.price.priceType] || {})
                    .to || 1000000
                }
                valueLabelDisplay="auto"
              />
            </Box>

            <FormControl>
              <FormLabel
                sx={{ color: "#000", "&.Mui-focused": { color: "#000" } }}
              >
                Sorting order
              </FormLabel>
              <RadioGroup defaultValue="LOW_TO_HIGH" onChange={handleChange}>
                <FormControlLabel
                  value="LOW_TO_HIGH"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "var(--primary-color)",
                        },
                        "& .MuiFormControlLabel-label": {
                          fontSize: 14,
                          fontFamily: "var(--gilroy-semibold)",
                        },
                      }}
                    />
                  }
                  label="Low to high"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: 14,
                      fontFamily: "var(--gilroy-semibold)",
                    },
                  }}
                />
                <FormControlLabel
                  value="HIGH_TO_LOW"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "var(--primary-color)",
                        },
                        "& .MuiFormControlLabel-label": {
                          fontSize: 14,
                          fontFamily: "var(--gilroy-semibold)",
                        },
                      }}
                    />
                  }
                  label="High to low"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: 14,
                      fontFamily: "var(--gilroy-semibold)",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </div>
        )}
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
                <CheckCircleIcon
                  style={{ color: "var(--primary-color)", marginRight: "-7px" }}
                  sx={{ ml: -0.5, zIndex: 2, pointerEvents: "none" }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </div>
      <button type="submit">Apply filters</button>
    </Form>
  );
};

export default Filters;
