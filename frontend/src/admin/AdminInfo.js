import React, { useState } from "react";
import styled from "styled-components";
import { isAutheticated } from "../auth/helper";
import AdminDashBoard from "../user/AdminDashBoard";

const AdminInfo = () => {
  const {
    user: { name, email },
  } = isAutheticated();
  const admin = () => {
    return (
      <Admn>
        <div className="headre">
          <h2>Dashboard</h2>
        </div>
        <div className="main">
          <h2>userName: {name}</h2>

          <h2>Email: {email} </h2>
        </div>
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
  font-size: 1.6rem;

  .main {
    height: 100%;

    padding: 0.5rem;
  }
`;

export default AdminInfo;
