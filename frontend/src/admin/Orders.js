import React, { useState } from "react";
import styled from "styled-components";
import AdminDashBoard from "../user/AdminDashBoard";

const Orders = () => {
  const ordr = () => {
    return (
      <Ordr>
        <div className="header">
          <h2>Orders</h2>
        </div>
        <div className="main"></div>
      </Ordr>
    );
  };

  return <AdminDashBoard child={ordr()} />;
};

const Ordr = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  box-shadow: 0px 0px 15px 3px rgba(21, 19, 46, 0.192);
  padding: 1.5rem 0rem 1.5rem 1.5rem;
  border-radius: 15px;
  font-size: 1.6rem;

  .main {
    height: 100%;

    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0.5rem 1.5rem 0.5rem 0.5rem;
  }
`;

export default Orders;
