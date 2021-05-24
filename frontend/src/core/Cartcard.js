import React, { useState } from "react";
import styled from "styled-components";
import ImageHelper from "../user/helper/imageHelper";
import { addItemToCart, removeItemFromCart } from "../user/helper/cartHelper";
import { Redirect } from "react-router-dom";

export const Cartcard = ({
  product,
  addtoCart = true,
  removefromCart = false,
  setReload = (f) => f,
  // function(f){return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : "a demo image";
  const cartDescription = product
    ? product.description
    : "a default description";
  const cartPrice = product ? product.price : "Default";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button onClick={addToCart}>
          {" "}
          <i class="fas fa-shopping-cart"></i>
          Add to cart
        </button>
      )
    );
  };
  const removeFromCart = (removefromCart) => {
    return (
      removefromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
        >
          <div className="lin1"></div>
          <div className="lin2"></div>
        </button>
      )
    );
  };
  return (
    <CardSection>
      <div className="prod">
        <div className="image">
          {getARedirect(redirect)}
          <ImageHelper product={product} />
        </div>
        <div className="detail">
          <h2>{cartTitle}</h2>
          <p>{cartDescription}</p>
        </div>
      </div>
      <div className="price">
        <h2>$ {cartPrice}</h2>
      </div>
      <div className="btn">
        {showAddToCart(addtoCart)}
        {removeFromCart(removefromCart)}
      </div>
    </CardSection>
  );
};

const CardSection = styled.div`
  background: rgb(255, 255, 255);
  width: 55vw;
  padding: 0.5rem 1rem;
  margin: 0.8rem 0rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  font-size: 1.6rem;

  .prod {
    display: flex;
  }

  .image {
    height: 8rem;
    width: 8rem;
    border-radius: 10px;
    border: 1px solid #d3d3d3;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
  }
  img {
    height: 100%;
    max-width: 8rem;
    max-height: 8rem;
    border-radius: 10px;
  }

  button {
    display: flex;
    border: none;
    background: #ffffff;
    color: white;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 10px;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
  }
  .lin1 {
    height: 2rem;
    width: 2px;
    background: #000000;
    transform: rotateZ(-45deg) translateY(4%);
  }
  .lin2 {
    height: 2rem;
    width: 2px;
    background: #000000;
    transform: rotateZ(45deg) translateY(5%);
  }

  i {
    margin-right: 0.4rem;
  }
  h2 {
    font-size: 1.6rem;
  }
  p {
    color: gray;
    font-size: 1.2rem;
  }
`;
