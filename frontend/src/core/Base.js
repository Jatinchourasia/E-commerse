import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";

const Base = ({ children }) => {
  return (
    <div className="base">
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default Base;
