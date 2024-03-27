import React from "react";
import { NavLink } from "react-router-dom";

const InDevelopment = () => {
  return (
    <>
      <div>This page is not ready yet, please come back later</div>
      Return to the <NavLink to="/main">Main Page</NavLink>
    </>
  );
};

export default InDevelopment;
