import React, { useState } from "react";
import styled from "styled-components";
import AdminDashBoard from "../user/AdminDashBoard";

const AdminInfo = () => {
  const admin = () => {
    return (
      <Admn>
        <div className="headre">
          <h2>Dashboard</h2>
        </div>
        <div className="main"></div>
      </Admn>
    );
  };

  return <AdminDashBoard child={admin()} />;
};

const Admn = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  box-shadow: 0px 0px 15px 3px rgba(21, 19, 46, 0.192);
  padding: 1.5rem 0rem 1.5rem 1.5rem;
  border-radius: 15px;
  .main {
    height: 100%;

    padding: 0.5rem;
  }
`;

export default AdminInfo;
