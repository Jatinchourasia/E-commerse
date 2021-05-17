import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";
import Base from "../core/Base";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  // upcoming data
  const { name, email, password, error, success } = values;

  const handelChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const successMessage = () => {
    return (
      <Success style={{ display: success ? "" : "none" }}>
        <p>
          New account created sucessfully. Please{" "}
          <Link to="/signin"> Login here</Link>
        </p>
      </Success>
    );
  };

  const errorMessage = () => {
    return (
      <Success style={{ display: error ? "" : "none" }}>
        <p>{error}</p>
      </Success>
    );
  };

  const SignUpForm = () => {
    return (
      <SignupForm>
        <div className="left">
          <img
            src="https://image.freepik.com/free-vector/customers-buying-goods-online_74855-4399.jpg"
            alt=""
          />
        </div>
        <div className="right">
          <div className="mainform">
            <h1>Get Started.</h1>
            <form action="">
              {successMessage()}
              {errorMessage()}
              <input
                type="text"
                onChange={handelChange("name")}
                placeholder="name"
                value={name}
              />
              <input
                type="text"
                onChange={handelChange("email")}
                placeholder="email"
                value={email}
              />
              <input
                type="text"
                onChange={handelChange("password")}
                placeholder="password"
                value={password}
              />
              <p>
                Already have an account?{" "}
                <span>
                  <Link to="/signin">Signin</Link>
                </span>
              </p>
              <button onClick={onSubmit}>Signup</button>
            </form>
          </div>
        </div>
      </SignupForm>
    );
  };

  return <Base>{SignUpForm()}</Base>;
};

const SignupForm = styled.div`
  min-height: 90vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2.5vw;
  background: #ffffff;
  .left {
    padding: 1rem;
    height: 90vh;
    width: 60vw;
    color: #000000;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .right {
    padding: 1rem;
    height: 80vh;
    width: 40vw;
    color: #000000;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  form {
    display: flex;

    flex-direction: column;
    align-items: center;
    p {
      margin-top: 4rem;
    }
  }
  input {
    margin: 0.5rem;
    border: none;
    padding: 0.8rem 1rem;
    width: 28vw;
    border-radius: 10px;
    border: solid #cfcfcf 1px;
    background: #ffffff;
    color: #000000;
    outline: none;
    font-family: "poppins", sans-serif;
  }
  input:focus {
    border: solid #000000 1px;
  }
  p {
    margin: 0.5rem;
    font-size: 0.8rem;
    color: gray;
  }
  a {
    text-decoration: none;
    color: #000000;
  }
  button {
    margin: 0.5rem;
    width: 28vw;
    border: none;
    border-radius: 10px;
    padding: 0.6rem 1rem;
    font-family: "poppins", sans-serif;
    cursor: pointer;
    background-color: black;
    color: white;
  }
  h1 {
    margin-bottom: 2rem;
  }
  img {
    width: 100%;
  }
`;

const Success = styled.div`
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    background: #000000;
    color: #ffffff;
    margin: 0.5rem;
    padding: 0.8rem 1rem;
    width: 28vw;
  }
`;

export default SignUp;
