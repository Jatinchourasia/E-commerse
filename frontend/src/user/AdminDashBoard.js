import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Base from "../core/Base";
import { isAutheticated, signout } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#000000", background: "#ffffff" };
  } else {
    return { color: "#c4c4c4" };
  }
};

const AdminDashBoard = ({ child }) => {
  let history = useHistory();
  const {
    user: { name, email, role },
  } = isAutheticated();

  const AdminLeftside = () => {
    return (
      <div className="admin-left">
        <div className="menu">
          <h2>Admin navigation</h2>
          <div className="links">
            <Link
              style={currentTab(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
            <br />{" "}
            <Link
              style={currentTab(history, "/admin/create/category")}
              to="/admin/create/category"
            >
              Create Categories
            </Link>
            <br />{" "}
            <Link
              style={currentTab(history, "/admin/categories")}
              to="/admin/categories"
            >
              Manage Categories
            </Link>
            <br />
            <Link
              style={currentTab(history, "/admin/create/products")}
              to="/admin/create/products"
            >
              Create Products
            </Link>
            <br />
            <Link
              style={currentTab(history, "/admin/products")}
              to="/admin/products"
            >
              Manage Products
            </Link>
            <br />
          </div>
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
    );
  };

  const AdminRightside = (chil) => {
    return <div className="admin-right">{chil}</div>;
  };

  return (
    <Base>
      <Admin>
        <div className="dashboard">
          {AdminLeftside()}
          {AdminRightside(child)}
        </div>
      </Admin>
    </Base>
  );
};

const Admin = styled.div`
  height: 92vh;
  padding: 0.5rem 1rem;
  background: rgba(125, 146, 177, 0.137);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;

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
    border-radius: 20px;
    box-shadow: 0px 0px 20px 2px rgba(21, 19, 46, 0.315);
  }
  .admin-right {
    height: 85vh;
    width: 60vw;
    background: #fff;
    border-radius: 19px;
    padding: 1rem;
  }
  .hero {
    margin-left: 1rem;
  }
  .admin-left {
    height: 85vh;
    width: 20vw;
    padding: 1rem 1rem 0.7rem 1rem;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .links {
    display: flex;
    flex-direction: column;
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

    a {
      font-size: calc(0.8rem + 0.8vw);
      margin: 0rem 0 0 0.5rem;
      font-weight: regular;
      color: #b6b6b6;
      cursor: pointer;
      text-decoration: none;
      padding: 0.5rem;
      border-radius: 12px;
    }
    a:hover {
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

export default AdminDashBoard;
