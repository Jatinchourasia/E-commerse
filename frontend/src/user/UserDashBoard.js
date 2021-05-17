import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Base from "../core/Base";
import { isAutheticated, signout } from "../auth/helper";

const UserDashBoard = () => {
  let history = useHistory();

  const {
    user: { name, email },
  } = isAutheticated();
  return (
    <Base>
      <User>
        <div className="dashboard">
          <div className="admin-right">
            <div className="menu">
              <h2>User info</h2>
            </div>
            <div className="logout">
              <p
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                logout <i className="fa fa-sign-out" aria-hidden="true"></i>
              </p>
            </div>
          </div>

          <div className="admin-left">
            <Usr>
              <div className="headre">
                <h2>Informatin</h2>
              </div>
              <div className="main">
                <h2>userName: {name}</h2>

                <h2>Email: {email} </h2>
              </div>
            </Usr>
          </div>
        </div>
      </User>
    </Base>
  );
};

const User = styled.div`
  height: 92vh;
  padding: 0.5rem 1rem;
  background: rgba(125, 146, 177, 0.137);
  display: flex;
  align-items: center;
  justify-content: center;
  .dashboard {
    height: 85vh;
    width: 80vw;
    position: relative;
    display: flex;

    background: linear-gradient(
      180deg,
      #162549 0%,
      rgba(55, 50, 115, 0.87) 100%
    );
    box-shadow: 0px 0px 20px 2px rgba(21, 19, 46, 0.315);

    border-radius: 20px;
  }
  .admin-left {
    height: 85vh;
    width: 60vw;
    background: #fff;
    border-radius: 19px;
  }

  .admin-right {
    height: 85vh;
    width: 20vw;
    padding: 1.5rem 1rem 0.7rem 1rem;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .menu {
    display: flex;
    min-height: 40vh;
    flex-direction: column;
    justify-content: space-between;
    h2 {
      color: white;
      margin-bottom: 3rem;
      pointer-events: none;
    }

    p {
      font-size: 1.4rem;
      margin: 0.8rem 0 0 1.5rem;
      font-weight: regular;
      color: #b6b6b6;
      cursor: pointer;
    }
    p:hover {
      color: white;
      transition: 0.5s ease;
    }
  }
  .logout {
    margin-left: 0.5rem;
    color: white;
    cursor: pointer;
  }
`;

const Usr = styled.div`
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

export default UserDashBoard;
