import React, { useState } from "react";
import styled from "styled-components";
import AdminDashBoard from "../user/AdminDashBoard";

const Orders = () => {
  const ordr = () => {
    return <h1>Order</h1>;
  };

  return <AdminDashBoard child={ordr()} />;
};

const AddProd = styled.div`
  height: 70vh;
  color: black;
`;

export default Orders;
