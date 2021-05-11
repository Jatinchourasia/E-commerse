import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "../user/helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";

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

  const token = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((prod) => {
      amount = amount + prod.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = { token, products };

    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={() => {
          makePayment();
        }}
        amount={getFinalPrice()}
        name="thankyou for buying"
        shippingAddress
        billingAddress
      >
        <button>pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">signin</Link>
    );
  };

  return (
    <div>
      <h3>Stripe Checkout ₹ {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
