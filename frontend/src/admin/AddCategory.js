import React, { useState } from "react";
import styled from "styled-components";
import { isAutheticated } from "../auth/helper";
import AdminDashBoard from "../user/AdminDashBoard";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAutheticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setError("");
    setSuccess(false);
    // backend req fired
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setName("");
        setSuccess(true);
      }
    });
  };

  const errMessage = () => {
    if (error) {
      return <p className="warning">failed to create category</p>;
    }
  };

  const successMessage = () => {
    if (success) {
      return <p className="success">successfully created category</p>;
    }
  };

  const CategoryForm = () => {
    return (
      <form>
        <p>Enter the Category</p>
        {errMessage()}
        {successMessage()}
        <input
          type="text"
          placeholder="eg. Winter"
          onChange={handleChange}
          value={name}
          required
          autoFocus
        />
        <br />
        <button onClick={onSubmit}>Create Category</button>
      </form>
    );
  };

  const cate = () => {
    return (
      <AddCate>
        <div className="headre">
          <h2>Create Category</h2>
        </div>
        <div className="main">{CategoryForm()}</div>
      </AddCate>
    );
  };

  return <AdminDashBoard child={cate()} />;
};

const AddCate = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 15px 3px rgba(21, 19, 46, 0.192);
  padding: 1.5rem;
  border-radius: 15px;
  font-size: 1.6rem;
  .main {
    display: flex;
    height: 60vh;
    flex-direction: column;
    justify-content: center;
  }
  form {
    margin-left: 4rem;
    button {
      margin: 0.5rem 0;
      border: none;
      border-radius: 10px;
      padding: 1rem 1.8rem;
      font-family: "poppins", sans-serif;
      cursor: pointer;
      color: white;
      background: black;
    }
    input {
      margin: 1rem 0;
      border: none;
      padding: 0.7rem 1rem;
      width: 26rem;
      border-radius: 10px;
      border: solid #000000 1px;
      background: #ffffff;
      color: white;
      outline: none;
      font-family: "poppins", sans-serif;
      color: black;
    }
    p {
      font-size: 1.6rem;
    }
    .success {
      font-size: 1.4rem;
      width: 26rem;

      padding: 1rem 0.6rem;
      border-radius: 10px;
      background: #afcaaf;
    }
    .warning {
      font-size: 1.4rem;
      width: 26rem;

      padding: 1rem 0.6rem;
      border-radius: 10px;
      background: #caafaf;
    }
  }
`;

export default AddCategory;
