import React, { useState, useEffect } from "react";
import styled from "styled-components";

import AdminDashBoard from "../user/AdminDashBoard";

import { Link } from "react-router-dom";

import { isAutheticated } from "../auth/helper";
import { deleteCategory, getCategories } from "./helper/adminapicall";
import Loader from "../core/Loader";

const ManageCategories = () => {
  // state
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // user info

  const { user, token } = isAutheticated();
  // useEffect
  // preload

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.err);
      } else {
        setCategories(data);
        setLoading(!loading);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  // deleteCategory

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.err);
      } else {
        preload();
      }
    });
  };

  const mangCate = () => {
    return (
      <ManagCate>
        <div className="headre">
          <h2>Manage Categories</h2>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="main">
            {categories.map((category, index) => {
              return (
                <Card key={index}>
                  <div className="right">
                    <h3>{category.name}</h3>
                  </div>
                  <div className="buttons">
                    <Link
                      to={`/admin/category/update/${category._id}`}
                      className="update"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => {
                        deleteThisCategory(category._id);
                      }}
                      className="delete"
                    >
                      Delete
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </ManagCate>
    );
  };

  return <AdminDashBoard child={mangCate()} />;
};

const ManagCate = styled.div`
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
    padding: 2.5rem 1.5rem 0.5rem 0.5rem;
  }
`;

const Card = styled.div`
  min-height: 2rem;
  width: 100%;
  box-shadow: 0px 0px 10px 0px rgba(179, 179, 179, 0.774);

  margin-bottom: 1.2rem;
  padding: 1rem;
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;

  button {
    border: none;
    width: 6rem;
    border-radius: 7px;
    margin-left: 0.5rem;
    padding: 0.5rem 0.8rem;
    font-family: "poppins", sans-serif;
    cursor: pointer;
    color: white;
    font-size: 1.6rem;
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

  .right {
    padding-left: 0.5rem;
  }
`;

export default ManageCategories;
