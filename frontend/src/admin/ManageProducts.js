import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdminDashBoard from "../user/AdminDashBoard";

import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";
import ImageHelper from "../user/helper/imageHelper";
import Loader from "../core/Loader";

const ManageProduct = () => {
  // state

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const { user, token } = isAutheticated();

  // useeffect
  const preload = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.err);
      } else {
        setProducts(data);
        setLoading(!loading);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  // onsubmit or deete product

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.err);
      } else {
        preload();
      }
    });
  };

  const managprod = () => {
    return (
      <ManagProd>
        <div className="headre">
          <h2>Manage Product</h2>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="main">
            {products.map((product, index) => {
              return (
                <Card key={index}>
                  <div className="image">
                    {/* todo photo */}
                    <ImageHelper product={product} />
                  </div>
                  <div className="details">
                    <div className="info">
                      <div className="right">
                        <p>name : {product.name}</p>
                        <p>price : $ {product.price}</p>
                      </div>
                      <div className="left">
                        <p>stocks : {product.stock}</p>
                        <p>sold : {product.sold}</p>
                      </div>
                    </div>
                    <div className="buttons">
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="update"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => {
                          deleteThisProduct(product._id);
                        }}
                        className="delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </ManagProd>
    );
  };

  return <AdminDashBoard child={managprod()} />;
};

const ManagProd = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  box-shadow: 0px 0px 15px 3px rgba(21, 19, 46, 0.192);
  padding: 1.5rem 0rem 1.5rem 1.5rem;
  border-radius: 15px;
  font-size: 1.6rem;

  .main {
    height: 100%;

    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0.5rem 1.5rem 0.5rem 0.5rem;
  }
`;

const Card = styled.div`
  min-height: 7rem;
  width: 100%;
  box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.774);

  margin-bottom: 0.6rem;
  padding: 0.5rem;
  display: flex;
  border-radius: 10px;

  .image {
    width: 6rem;
    padding: 0.5rem;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .details {
    width: 100%;
    margin: 0 0.5rem;
    padding: 0.5rem;
  }
  img {
    width: 6rem;
    border-radius: 5px;
  }
  .buttons {
  }
  .info {
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 0.5rem;

    p {
      font-size: 1.5rem;
    }
  }
  .right {
    width: 60%;
  }
  .left {
    width: 40%;
  }

  button {
    border: none;
    width: 6rem;
    border-radius: 7px;
    margin-left: 0.5rem;
    padding: 0.5rem 0.8rem;
    font-family: "poppins", sans-serif;
    cursor: pointer;
    color: white;
  }
  .update {
    background: #24b324;
    border: none;
    width: 5rem;
    border-radius: 7px;
    margin-left: 0.5rem;
    padding: 0.5rem 0.8rem;
    font-family: "poppins", sans-serif;
    cursor: pointer;
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
  }
  .delete {
    background: #b91f1f;
    font-size: 1.2rem;
  }
`;

export default ManageProduct;
