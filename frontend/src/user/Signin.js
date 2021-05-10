import React, { useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAutheticated } from "../auth/helper";
import Base from "../core/Base";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "new@gmail.com",
    password: "new@gmail.com",
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
                  <Link to="/signup">Register</Link>
                </span>
              </p>
              <button onClick={onSubmit}>Signin</button>
              <p>{JSON.stringify(values)}</p>
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
  display: flex;
  align-items: center;
  min-height: 5vh;
  background-color: white;
  width: 16rem;
  border-radius: 10px;
`;
const SigninForm = styled.div`
  min-height: 90vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2.5vw;
  background: black;
  .right {
    padding: 1rem;
    height: 80vh;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    margin: 0.5rem;
    border: none;
    padding: 0.5rem 1rem;
    width: 16rem;
    border-radius: 10px;
    border: solid #949494 1px;
    background: black;
    color: white;
    outline: none;
    font-family: "poppins", sans-serif;
  }
  input::after {
    border: solid #ffffff 1px;
  }
  p {
    margin: 0.5rem;
    font-size: 0.8rem;
    color: gray;
  }
  a {
    text-decoration: none;
    color: white;
  }
  button {
    margin: 0.5rem;
    width: 16rem;
    border: none;
    border-radius: 10px;
    padding: 0.6rem 1rem;
    font-family: "poppins", sans-serif;
    cursor: pointer;
  }
  h1 {
    margin-bottom: 2rem;
  }
`;

export default SignIn;
