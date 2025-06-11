import React from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

const CountryLayout: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default CountryLayout;
