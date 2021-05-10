import React from "react";
import styled from "styled-components";
import ImageHelper from "../user/helper/imageHelper";

const Card = ({ product }) => {
  return (
    <CardSection>
      <ImageHelper product={product} />
      <div className="desc">
        <h2>T-shirt</h2>
        <h2>$500</h2>
      </div>
      <div className="btn">
        <button>Add to cart</button>
      </div>
    </CardSection>
  );
};

const CardSection = styled.div`
  min-height: 10vh;

  width: 15rem;
  background: rgb(255, 255, 255);
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 0.8rem 0rem;
  box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.774);
  img {
    width: 100%;
    border-radius: 10px;
  }
  .desc {
    margin: 0.5rem;
    display: flex;
    justify-content: space-between;
  }

  button {
    display: flex;
    border: none;
    background: black;
    color: white;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8rem 2rem;
    border-radius: 10px;
    font-family: "Poppins", sans-serif;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Card;
