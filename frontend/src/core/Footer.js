import React from "react";
import styled from "styled-components";
const Footer = () => {
  return (
    <Foot>
      <div className="footer">
        <h1>this is footer</h1>
      </div>
    </Foot>
  );
};

const Foot = styled.div`
  background-color: #5e5e5e;
  width: 100vw;
  min-height: 10vh;
  display: flex;
  justify-content: center;
  .footer {
    display: flex;
    width: 90vw;
    color: white;
    justify-content: center;
  }
`;

export default Footer;
