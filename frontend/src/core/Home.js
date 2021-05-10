import React from "react";
import styled from "styled-components";
import Base from "./Base";
import Card from "./Card";

const Home = () => {
  return (
    <Base>
      <HomeSection>
        <Card />
      </HomeSection>
    </Base>
  );
};

const HomeSection = styled.div`
  min-height: 85vh;
  width: 95vw;
  margin: 0 2.5vw;
  padding: 1rem;

  /* testing purpose */
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

export default Home;
