import React, { useState } from "react";
import { Slider } from "antd";
import store from "../../store/store";
import axios from "axios";
import { API } from "../../store/store";

const Filters = () => {
  const [filterItems, setFilterItems] = useState({
    location: "",
    price: {
      priceType: "",
      priceRange: {
        from: 100,
        to: 1500000,
      },
      sortingOrder: "LOW_TO_HIGH",
      currencyCode: "AMD",
    },
  });
  const handleChange = (e) => {
    store.getPriceRange(filterItems.location);
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFilterItems((prevFilters) => ({
        ...prevFilters,
        price: {
          ...prevFilters.price,
          [name]: checked
            ? prevFilters.price.priceType +
              (prevFilters.price.priceType ? ", " : "") +
              value
            : prevFilters.price.priceType
                .split(", ")
                .filter((item) => item !== value)
                .join(", "),
        },
      }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let filters = { ...filterItems };
    store.setLoading(true);
    if (filters.location === "") {
      delete filters.location;
    }
    if (filters.price.sortingOrder === "") {
      delete filters.price.sortingOrder;
    }
    if (
      filters.price.priceType === "PER_DAY, PER_HOUR" ||
      filters.price.priceType === "PER_HOUR, PER_DAY" ||
      filters.price.priceType === ""
    ) {
      delete filters.price;
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
    <form method="post" onSubmit={handleSubmit}>
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
      {filterItems.price.priceType &&
        !filterItems.price.priceType.includes("PER_DAY, PER_HOUR") && (
          <div>
            <Slider range step={1} min={0} max={100} defaultValue={[20, 80]} />
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
          </div>
        )}
      <button type="submit">Apply filters</button>
    </form>
  );
};

export default Filters;
