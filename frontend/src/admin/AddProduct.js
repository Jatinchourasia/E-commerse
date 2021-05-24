import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import styled from "styled-components";
import { isAutheticated } from "../auth/helper/index";
import Loader from "../core/Loader";
import AdminDashBoard from "../user/AdminDashBoard";
import { createProduct, getCategories } from "./helper/adminapicall";

const AddProduct = () => {
  // state

  const { user, token } = isAutheticated();
  const [values, setValues] = useState({
    name: "",
    photo: "",
    description: "",
    price: "",
    stock: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  // destructure
  const {
    name,
    photo,
    description,
    price,
    category,
    stock,
    categories,
    loading,
    createdProduct,
    error,
    formData,
    getaRedirect,
  } = values;

  // preload to load all th ecategories

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  // its going to load our data
  useEffect(() => {
    preload();
  }, []);

  // handelchange

  const handleChange = (name) => (event) => {
    // if name of value is photo i.e the file if photo then we want the path of that file so terget.file[0] is used for path
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    formData.set(name, value);

    setValues({ ...values, [name]: value });
  };

  // submit

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: true });
      } else {
        setValues({
          ...values,
          name: "",
          photo: "",
          description: "",
          price: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
          getaRedirect: true,
        });
      }
    });
  };
  const history = useHistory();

  const performRedirect = () => {
    if (getaRedirect) {
      setTimeout(() => {
        history.push("/admin/dashboard");
      }, 2000);
    }
  };

  const successMessage = () => {
    return (
      <span style={{ display: createdProduct ? "" : "none" }}>
        {createProduct} created successfully
      </span>
    );
  };
  const errorMessage = () => {
    return (
      <span style={{ display: !createdProduct ? "" : "none", color: "red" }}>
        {error}
      </span>
    );
  };

  const productForm = () => {
    return (
      <form>
        <label>post photo</label>
        <input
          onChange={handleChange("photo")}
          type="file"
          name="photo"
          accept="image"
          placeholder="choose a file"
        />
        <input
          onChange={handleChange("name")}
          name="photo"
          placeholder="Name"
          value={name}
        />
        <textarea
          onChange={handleChange("description")}
          name="photo"
          placeholder="Description"
          value={description}
        />
        <input
          onChange={handleChange("price")}
          type="number"
          placeholder="Price"
          value={price}
        />
        <select onChange={handleChange("category")} placeholder="Category">
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => {
              return (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              );
            })}
        </select>
        <input
          onChange={handleChange("stock")}
          type="number"
          placeholder="Stock"
          value={stock}
        />
        <br />
        <div className="bottom">
          <button type="submit" onClick={onSubmit}>
            Create Product
          </button>
          <p>
            {successMessage()}
            {errorMessage()}
            {performRedirect()}
          </p>
        </div>
      </form>
    );
  };

  const prod = () => {
    return (
      <AddProd>
        <div className="headre">
          <h2>Create Product</h2>
        </div>
        {loading ? <Loader /> : <div className="main">{productForm()}</div>}
      </AddProd>
    );
  };

  return <AdminDashBoard child={prod()} />;
};

const AddProd = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  box-shadow: 0px 0px 15px 3px rgba(21, 19, 46, 0.192);
  padding: 1rem 2rem 1rem 1rem;

  border-radius: 15px;
  font-size: 1.6rem;

  .main {
    height: 100%;

    overflow-y: scroll;
    overflow-x: hidden;
    padding: 1rem 2rem 1rem 1rem;
  }

  form {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    button {
      margin: 0.5rem 0;
      border: none;
      width: 20rem;
      border-radius: 10px;
      padding: 1.2rem 2rem;
      font-family: "poppins", sans-serif;
      cursor: pointer;
      color: white;
      background: black;
    }
    input {
      margin: 0.5rem 0;
      border: none;
      padding: 1rem 2rem;
      width: 80%;
      border-radius: 10px;
      border: solid #000000 1px;
      background: #ffffff;
      color: white;
      outline: none;
      font-family: "poppins", sans-serif;
      color: black;
    }
    textarea {
      margin: 0.5rem 0;
      border: none;
      padding: 0.7rem 1.2rem;
      max-width: 80%;
      min-width: 80%;
      min-height: 5rem;
      max-height: 5rem;

      border-radius: 10px;
      border: solid #000000 1px;
      background: #ffffff;
      color: white;
      outline: none;
      font-family: "poppins", sans-serif;
      color: black;
      font-size: 1.5rem;
    }
    span {
      font-size: 0.9rem;
      color: green;
    }
    select {
      margin: 0.5rem 0;
      border: none;
      padding: 0.5rem 1rem;
      width: 80%;
      border-radius: 10px;
      border: solid #000000 1px;
      background: #ffffff;
      color: white;
      outline: none;
      font-family: "poppins", sans-serif;
      color: black;
    }
    p {
      font-size: 1.2rem;
    }
    .success {
      font-size: 1rem;
      width: 23rem;
      padding: 0.8rem 1.2rem;
      border-radius: 10px;
      background: #afcaaf;
    }
    .warning {
      font-size: 1rem;
      width: 23rem;
      padding: 0.8rem 1.2rem;
      border-radius: 10px;
      background: #caafaf;
    }
    .bottom {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

export default AddProduct;
