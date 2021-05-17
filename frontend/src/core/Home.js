import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "../admin/helper/adminapicall";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base>
      <HomeSection>
        <h1>All T-shirts</h1>

        <div className="products">
          {product.map((prod, index) => {
            {
              /* console.log(prod); */
            }
            return <Card product={prod} key={index} />;
          })}
        </div>
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
    min-height: 80vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-column-gap: 1rem;
    grid-row-gap: 2rem;
  }
`;

export default Home;
