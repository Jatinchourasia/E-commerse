import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "../admin/helper/adminapicall";
import { loadCart } from "../user/helper/cartHelper";
import { Cartcard } from "./Cartcard";
import { isAutheticated } from "../auth/helper";
import StripeCheckout from "./StripeCheckout";
import imageofcart from "./vector-creator.png";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const getFinalPrice = () => {
    let amount = 0;
    products.map((prod) => {
      amount = amount + prod.price;
    });
    return amount;
  };

  const loadAllProducts = (products) => {
    const { user } = isAutheticated();
    return (
      <div className="caaart">
        <div className="products-container">
          <div className="cartproducts">
            <div className="prod">
              {products.map((prod, index) => {
                return (
                  <Cartcard
                    key={index}
                    product={prod}
                    addtoCart={false}
                    removefromCart={true}
                    setReload={setReload}
                    reload={reload}
                  />
                );
              })}
            </div>
          </div>
          <div className="total">
            <div className="back">
              <Link to="/">
                <i className="fas fa-arrow-left"></i> continue shopping
              </Link>
            </div>
            <div className="amount">
              <p>
                Sub-total: <span>$ {getFinalPrice()}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="chkout">
          {isAutheticated() && (
            <div className="ckeckout">
              <div className="checkcard">
                <div className="header">Username</div>
                <p>
                  <i className="fa fa-user" aria-hidden="true"></i>
                  {user.name}
                </p>
              </div>
              <div className="checkcard">
                <div className="header">Email</div>
                <p>
                  <i className="fas fa-envelope-open"></i>
                  {user.email}
                </p>
              </div>
              <div className="bill">
                <div className="subtotl">
                  <p>Sub-total :</p>
                  <p>$ {getFinalPrice()} </p>
                </div>
                <div className="taxes">
                  <p>Taxes :</p>
                  <p>free </p>
                </div>
                <div className="linee"></div>
                <div className="grandtotal">
                  <h2>Total price</h2>
                  <h2>$ {getFinalPrice()}</h2>
                </div>
                
              </div>
              <div className="payment-button">
              <StripeCheckout   products ={products}
              setReload={setReload}
              reload={reload}
              />
              </div>
              

              {/* <BraintreePay products={products} setReload={setReload} /> */}
            </div>
          )}
        </div>
      .
      </div>
      
    );
  };

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  return (
    <Base>
      <HomeSection>
        <h2>Shopping Cart</h2>

        <div className="products">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <div className="empty-cart">
              <img src={imageofcart} alt="" />
            </div>
          )}
        </div>
      </HomeSection>
    </Base>
  );
};

const HomeSection = styled.div`
  min-height: 95vh;
  width: 95vw;
  margin: 0 2.5vw;
  padding: 1rem;
  .empty-cart {
    display: flex;
    height: 90vh;
    width: 90vw;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 40%;
  }
  .cartproducts {
    height: 60vh;
    overflow-y: scroll;

    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
  }

  .cartproducts::-webkit-scrollbar {
    width: 5px;
  }
  .cartproducts::-webkit-scrollbar-track {
    background: transparent;
  }
  .cartproducts::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.5);
    border-radius: 20px;
    border: transparent;
  }

  .caaart {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
  }
  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 1rem;
    p {
      color: #616161;
      font-size: 1rem;
    }
    span {
      color: black;
      font-size: 1.2rem;
    }

    a {
      color: #0157fe;
      text-decoration: none;
      font-weight: 100;
    }
  }
  .checkcard {
    background-color: #f2f7fd;
    height: 5rem;
    width: 100%;
    border-radius: 15px;
    padding: 0.5rem 0.8rem;
    margin-bottom: 0.5rem;
    i {
      margin-right: 0.5rem;
    }
  }
  .bill {
    background-color: #f2f7fd;
    min-height: 5rem;
    width: 100%;
    border-radius: 15px;
    padding: 0.5rem 0.8rem;
    margin-bottom: 0.5rem;
  }
  .chkout {
    width: 32vw;
  }
  .header {
    margin-bottom: 0.8rem;
  }
  .linee {
    height: 1px;
    width: 100%;
    background: #b4b4b4;
  }

  .subtotl,
  .taxes,
  .grandtotal {
    display: flex;
    justify-content: space-between;
    padding: 0 0.5rem;
    margin-top: 0.5rem;
    h2 {
      font-size: 1.2rem;
    }
  }

  .payment-button{
    
  }
`;

export default Cart;
