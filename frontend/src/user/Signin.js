import React, { useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAutheticated } from "../auth/helper";
import Base from "../core/Base";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <Success>
          <p>Loading ...</p>
        </Success>
      )
    );
  };

  const errorMessage = () => {
    return (
      <Success style={{ display: error ? "" : "none" }}>
        <p>{error}</p>
      </Success>
    );
  };

  const SignInForm = () => {
    return (
      <SigninForm>
        <div className="left">
          <img
            src="https://image.freepik.com/free-vector/customer-buying-cloth-internet-store-women-using-gadget-online-shopping-flat-vector-illustration-ecommerce-sale-retail-concept_74855-9833.jpg"
            alt=""
          />
        </div>
        <div className="right">
          <div className="mainform">
            <h1>Let's sign you in.</h1>
            <form action="">
              {errorMessage()}
              {loadingMessage()}
              <input
                type="email"
                onChange={handleChange("email")}
                placeholder="email"
                value={email}
              />
              <input
                type="password"
                onChange={handleChange("password")}
                placeholder="password"
                value={password}
              />
              <p>
                Don't have an account?
                <span>
                  <Link to="/signup"> Register</Link>
                </span>
              </p>
              <button onClick={onSubmit}>Signin</button>
            </form>
          </div>
        </div>
      </SigninForm>
    );
  };

  return (
    <Base>
      {SignInForm()}

      {performRedirect()}
    </Base>
  );
};
const Success = styled.div`
  font-size: 1.6rem;

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
const SigninForm = styled.div`
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
    font-size: 1.2rem;
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
    padding: 1rem 1.4rem;

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

export default SignIn;
