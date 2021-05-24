import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <Foot>
      <div className="footer">
        <div className="left">
          <h2>Explore</h2>
          <Link>View cart</Link>
          <Link>Dashboard</Link>
          <Link>Contact</Link>
          <Link>About us</Link>
        </div>
        <div className="right">
          <div className="contact">
            <h2>Contact</h2>
            <p>
              {" "}
              <i className="fa fa-phone" aria-hidden="true"></i>
              Company Inc ...Jabalpur,Madhya Pradesh
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i>call us on toll free
              (1800)XX-XXXXX
            </p>
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="copyright">
        <p>© 2021 | Rody (All rights reserved).</p>
      </div>
    </Foot>
  );
};

const Foot = styled.div`
  background-color: #f2f2f2;
  width: 100vw;
  height: 50vh;
  font-size: 1.5rem;
  .footer {
    display: flex;
  }
  .left {
    height: 45vh;
    width: 50vw;
    display: flex;
    flex-direction: column;
    padding: 4rem 0 0 5rem;
  }

  a {
    text-decoration: none;
    color: black;
    margin: 0.5rem 0 0 0.8rem;
  }
  .right {
    width: 50vw;
    height: 45vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 0 0 5rem;
  }
  .contact {
    height: 30vh;
    display: flex;
    flex-direction: column;
    p {
      margin: 0.5rem 0 0 0.8rem;
    }
  }
  .copyright {
    color: #575757;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      margin-top: 0.5rem;
    }
  }
  i {
    margin-right: 0.5rem;
  }
  .line {
    height: 1px;
    width: 100vw;
    background-color: rgba(78, 76, 76, 0.356);
  }
`;

export default Footer;
