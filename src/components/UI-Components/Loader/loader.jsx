import React from "react";
import "./loader.scss";

const Loader = () => {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="card">
          <div className="shimmerBG img"></div>
          <div className="p-16">
            <div className="shimmerBG line-name"></div>
            <div className="shimmerBG line-name price"></div>
            <div className="shimmerBG line-name details"></div>
            <div className="car-owner">
              <div className="shimmerBG owner-icon"></div>
              <div className="shimmerBG owner-name"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Loader;
