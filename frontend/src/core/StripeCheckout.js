import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "../user/helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import styled from "styled-components";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const usertoken = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((prod) => {
      amount = amount + prod.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const price = parseInt(getFinalPrice());

    // console.log("token", token);
    // console.log("usertoken", usertoken);
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        setData({ ...data, success: true, loading: false });

        const orderData = {
          products: products,
          transection_id: token.id,
          amount: price,
        };
        // console.log("order,data", orderData);
        createOrder(userId, usertoken, orderData);
        // console.log("from stripe checkout", userId, token, orderData);
        cartEmpty(() => {
          console.log("is it a crash");
        });
        setReload(!reload);
        // console.log(response);
      })
      .catch((err) => {
        setData({ loading: false, success: false });
        console.log(err);
      });
  };

  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="thankyou for buying"
        shippingAddress
        billingAddress
      >
        <button>Checkout</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">signin</Link>
    );
  };

  return <Styledbtn>{showStripeButton()}</Styledbtn>;
};

const Styledbtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    margin: 1rem;
    border: none;
    padding: 0.7rem 1.4rem;
    cursor: pointer;
    background: black;
    color: white;
    border-radius: 10px;
    font-family: "Poppins", sans-serif;
  }
`;

export default StripeCheckout;
