import React, { useState } from "react";
import styled from "styled-components";
import ImageHelper from "../user/helper/imageHelper";
import { addItemToCart, removeItemFromCart } from "../user/helper/cartHelper";
import { Redirect } from "react-router-dom";

const Card = ({
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
          Remove From Cart
        </button>
      )
    );
  };
  return (
    <CardSection>
      <div className="image">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
      </div>
      <div className="detail">
        <div className="desc">
          <h2>{cartTitle}</h2>
          <h2>₹ {cartPrice}</h2>
        </div>
        <div className="btn">
          {showAddToCart(addtoCart)}
          {removeFromCart(removefromCart)}
        </div>
      </div>
    </CardSection>
  );
};

const CardSection = styled.div`
  min-height: 20rem;
  width: 15rem;
  background: rgb(255, 255, 255);
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 0.8rem 0rem;
  box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.774);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .image {
    background: rgba(226, 226, 226, 0.575);
    height: 16rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: auto;
    height: auto;
    max-width: 14rem;
    max-height: 16rem;
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
    cursor: pointer;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  i {
    margin-right: 0.4rem;
  }
`;

export default Card;
