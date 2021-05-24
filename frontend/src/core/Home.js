import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "../admin/helper/adminapicall";
import { Link, animateScroll as scroll } from "react-scroll";
import boy from "../img/boy.png";
import Loader from "./Loader";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const loadAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        setLoading(!loading);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base>
      <HomeStyle>
        <div className="ads">
          <div className="cover1">
            <div className="cover1-right">
              <div className="detail">
                <p>-2021 fashion trend</p>
                <h1>
                  Enjoy Our New <br />
                  Summer Collection.
                </h1>
                <div className="link">
                  <Link
                    activeClass="active"
                    to="main"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    shop now
                  </Link>
                </div>
              </div>
            </div>
            <div className="cover1-left">
              <div className="image">
                <img src={boy} alt="" />
              </div>
            </div>
          </div>
        </div>
        <HomeSection>
          <h1 id="main">All T-shirts</h1>
          {loading ? (
            <Loader />
          ) : (
            <div className="products">
              {product.map((prod, index) => {
                {
                  /* console.log(prod); */
                }
                return <Card product={prod} key={index} />;
              })}
            </div>
          )}
        </HomeSection>
      </HomeStyle>
    </Base>
  );
};

const HomeStyle = styled.div`
  min-height: 90vh;
  width: 100vw;
  .ads {
    height: 90vh;
    width: 100vw;
  }
  .cover1 {
    background: #e8eee4;
    height: 90vh;
    width: 100vw;
    display: flex;
  }

  .cover1-right {
    height: 90vh;
    width: 55vw;
    display: flex;
    align-items: center;
    padding-left: 7rem;
  }
  .detail {
    display: flex;
    height: 30vh;
    flex-direction: column;
    justify-content: space-around;
    p {
      font-size: 1.5rem;
    }

    h1 {
      font-size: calc(5rem + 1vh);
    }
    a {
      padding: 1.2rem 2rem;
      cursor: pointer;
      background: black;
      color: white;
      border-radius: 10px;
      font-size: 1.5rem;
    }
    .link {
      margin-top: 2rem;
    }
  }
  .cover1-left {
    height: 90vh;
    width: 45vw;

    .image {
      padding-top: 5rem;

      height: 90vh;
      width: 45vw;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  img {
    width: auto;
    height: 100%;
  }
`;
const HomeSection = styled.div`
  min-height: 85vh;
  width: 95vw;
  margin: 0 2.5vw;
  padding: 1rem;
  .products {
    min-height: 80vh;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-column-gap: 1rem;
    grid-row-gap: 2rem;
  }
  h1 {
    font-size: 3rem;
    margin-bottom: 3rem;
  }
`;

export default Home;
