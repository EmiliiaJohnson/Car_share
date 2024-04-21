import React, { useState, useEffect } from "react";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { Form, Checkpoint } from "./styled-filters.js";
import checkpoint from "../../assets/images/checkpoint.svg";

import { ConfigProvider, Slider } from "antd";
import store from "../../store/store";
import axios from "axios";
import { API } from "../../store/store";
import { carTypes } from "../../store/store";

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
    console.log(filterItems);
  };

  const handleSliderChange = (values) => {
    setFilterItems((prevFilters) => ({
      ...prevFilters,
      price: {
        ...prevFilters.price,
        priceRange: {
          from: values[0],
          to: values[1],
        },
      },
    }));
  };

  const handleSubmit = (e) => {
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
      <label>
        Location
        <select onChange={handleChange} name="location">
          <option value="">All</option>
          <option value="Yerevan">Yerevan</option>
          <option value="Gyumri">Gyumri</option>
          <option value="Samara">Samara</option>
        </select>
      </label>
      Price
      <label>
        Per day
        <input
          type="checkbox"
          name="priceType"
          value="PER_DAY"
          checked={filterItems.price.priceType.includes("PER_DAY")}
          onChange={handleChange}
        />
      </label>
      <label>
        Per hour
        <input
          type="checkbox"
          name="priceType"
          value="PER_HOUR"
          checked={filterItems.price.priceType.includes("PER_HOUR")}
          onChange={handleChange}
        />
      </label>
      {!filterItems.price.priceType.includes("PER_DAY, PER_HOUR") &&
        !filterItems.price.priceType.includes("PER_HOUR, PER_DAY") && (
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Slider: {
                    dotActiveBorderColor: "#644BE4",
                    dotBorderColor: "#644BE4",
                    handleActiveColor: "#644BE4",
                    handleColor: "#644BE4",
                    railBg: "#EDE9FF",
                    railHoverBg: "#E3DEFF",
                    trackBg: "#644BE4",
                    trackHoverBg: "#644BE4",
                  },
                },
              }}
            >
              <Slider
                range
                step={100}
                defaultValue={[
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
              />
            </ConfigProvider>
            <div>
              Sorting order
              <label>
                Low to high
                <input
                  type="radio"
                  name="sortingOrder"
                  value="LOW_TO_HIGH"
                  checked={filterItems.price.sortingOrder === "LOW_TO_HIGH"}
                  onChange={handleChange}
                />
              </label>
              <label>
                High to low
                <input
                  type="radio"
                  name="sortingOrder"
                  value="HIGH_TO_LOW"
                  checked={filterItems.price.sortingOrder === "HIGH_TO_LOW"}
                  onChange={handleChange}
                />
              </label>
            </div>
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
                        filterItems.carTypes.includes(item)
                          ? "soft"
                          : "outlined"
                      }
                      slotProps={{
                        action: ({ checked }) => ({
                          sx: checked
                            ? {
                                height: "32px",
                                border: "none",
                                backgroundColor: "#E3DEFF",
                                "&:hover": {
                                  backgroundColor: "#E3DEFF",
                                },
                              }
                            : {
                                height: "32px",
                                border: "1px solid #644BE4",
                              },
                        }),
                      }}
                    />
                    {filterItems.carTypes.includes(item) && (
                      <Checkpoint src={checkpoint} alt="" />
                    )}
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        )}
      <button type="submit">Apply filters</button>
    </Form>
  );
};

export default Filters;
