import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { isAutheticated, signout } from "../auth/helper";
import { loadCart } from "../user/helper/cartHelper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#000000" };
  } else {
    return { color: "#c4c4c4" };
  }
};

const Nav = ({ history }) => {
  return (
    <Navigation>
      <div className="nav">
        <ul className="nav-links">
          <li>
            <Link style={currentTab(history, "/")} className="nav-link" to="/">
              home
            </Link>
          </li>
          <li>
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              dashboard
            </Link>
          </li>
          {isAutheticated() && isAutheticated().user.role === 1 && (
            <li>
              <Link
                style={currentTab(history, "/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard"
              >
                a.dashboard
              </Link>
            </li>
          )}
          {!isAutheticated() && (
            <Fragment>
              <li>
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  signin
                </Link>
              </li>{" "}
              <li>
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  signup
                </Link>
              </li>
            </Fragment>
          )}
          {isAutheticated() && (
            <li>
              <span
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </span>
            </li>
          )}
        </ul>
        <ul className="cart">
          <li>
            <Link
              style={currentTab(history, "/cart")}
              className="nav-link"
              to="/cart"
            >
              <h3>
                <i className="fas fa-shopping-cart"></i>
              </h3>
            </Link>
          </li>
        </ul>
      </div>
    </Navigation>
  );
};

const Navigation = styled.div`
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  position: relative;

  .nav {
    width: 90%;
    margin: auto;
    display: flex;
    align-items: center;
    min-height: 8vh;
    padding: 0.5rem 0rem;
    justify-content: space-between;
  }
  ul {
    list-style: none;
  }
  a {
    color: black;
    text-decoration: none;
  }
  li {
    padding: 0 1rem;
  }
  .nav-links {
    display: flex;
    align-items: center;
    flex: 1 1 20rem;
  }
  span {
    cursor: pointer;
  }
`;

export default withRouter(Nav);
