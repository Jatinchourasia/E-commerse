import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "../admin/helper/adminapicall";
import { loadCart } from "../user/helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const loadAllProducts = () => {
    return (
      <div className="caaart">
        <div className="prod">
          <h1>for products</h1>
          {products.map((prod, index) => {
            return (
              <Card
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

        <div className="chkout">
          <h1>for checkout</h1>
          <StripeCheckout products={products} setReload={setReload} />
        </div>
      </div>
    );
  };

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  return (
    <Base>
      <HomeSection>
        <h1>All T-shirts</h1>

        <div className="products">{loadAllProducts()}</div>
      </HomeSection>
    </Base>
  );
};

const HomeSection = styled.div`
  min-height: 85vh;
  width: 95vw;
  margin: 0 2.5vw;
  padding: 1rem;
  .products {
    display: grid;
    grid-template-columns: repete(4, 1fr);
    grid-template-rows: repete(4, 1fr);
    column-gap: 50px;
    row-gap: 50px;
  }
  .caaart {
    display: flex;
    justify-content: space-between;
    padding: 0 3rem;
  }
`;

export default Cart;
