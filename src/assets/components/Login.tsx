import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useSignIn } from "react-auth-kit";
import { Button } from "react-bootstrap";
import "../styles/Login.scss";
import popcorn_img from "../styles/assets/popcorn_logo_tpt.png";
import Navbar from "./Navbar";

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    username: "admin",
    password: "test",
  });

  const [loginSuccess, setLoginSuccess] = useState(true);

  const BASE_URL = import.meta.env?.VITE_BASE_URL;
  const PORT = import.meta.env?.VITE_PORT;

  const nav = useNavigate();
  const signIn = useSignIn();

  const submitLogin = async (e: React.SyntheticEvent, isGuest?: boolean) => {
    const apiURL = new URL("/api/users/auth", BASE_URL + ":" + PORT).href;

    // if (isGuest) {
    //   console.log("enter guest");
    //   setUserLogin({
    //     ...userLogin,
    //     username: "guest",
    //     password: "",
    //     name: "Guest",
    //   });

    //   console.log("user: ", JSON.stringify(userLogin));
    // } else {
    //   console.log("enter user");
    // }

    await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: isGuest
        ? JSON.stringify({ username: "guest", password: "" })
        : JSON.stringify(userLogin),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message === "Not Found") {
          setLoginSuccess(false);
        } else {
          // console.log(JSON.stringify(res));

          let val = signIn({
            token: res.token?.token,
            expiresIn: res.token?.expiry / 60,
            tokenType: "Bearer",
            authState: { username: res.username, name: res.name },
          });
          // ? console.log("success")
          // : console.log("fail");

          setLoginSuccess(true);
          nav("/movie-list");
        }
      })
      .catch((err) => {
        // console.log(err);
        setLoginSuccess(false);
      });
  };

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            {/* <div className="col-6 col-md-6 col-lg-3 col-xl-4 m-0 p-0 login login-left">
              <div className="card">
                <div className="card-body justify-content-center">
                  <div className="mb-md-5 mt-md-4">
                    <h1 className="text-uppercase">Film</h1>
                    <h1 className="text-uppercase">React</h1>
                    <img src={popcorn_img} />
                  </div>
                </div>
              </div> 
  </div>*/}
            <div className="col-6 col-md-6 col-lg-5 col-xl-4 m-0 p-0 rounded login login-right">
              <div
                // bg-dark text-white
                className="card"
              >
                <div className="card-body p-5 text-left">
                  <div className="mb-md-5 mt-md-4">
                    <div className="d-flex flex-row mb-md-5 justify-content-center">
                      <img src={popcorn_img} />
                      <div className="d-flex flex-column justify-content-end">
                        <h3 className="fw-bold">FILM</h3>
                        <h3 className="fw-bold">REACTS</h3>
                      </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-baseline">
                      <h2 className="mb-2 text-uppercase">Login</h2>
                      <a
                        className="text-reset login-guest"
                        onClick={(e) => submitLogin(e, true)}
                        key={"log_guest"}
                      >
                        or Login as Guest
                      </a>
                    </div>

                    <div className="form-outline form-white mb-2">
                      <input
                        type="text"
                        id="typeUsername"
                        onChange={(e) => {
                          setUserLogin({
                            ...userLogin,
                            username: e.target.value,
                          });
                        }}
                        value={userLogin.username}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="typeUsername">
                        Username
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePassword"
                        value={userLogin.password}
                        onKeyDown={(e: React.KeyboardEvent) => {
                          if (e.key === "Enter") {
                            submitLogin(e);
                          }
                        }}
                        onChange={(e) => {
                          setUserLogin({
                            ...userLogin,
                            password: e.target.value,
                          });
                          setLoginSuccess(true);
                        }}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="typePassword">
                        Password
                      </label>
                    </div>
                    {!loginSuccess && (
                      <span className="label label-danger">
                        Failed to Login!
                      </span>
                    )}
                    <div className="d-flex justify-content-end">
                      <button
                        onClick={submitLogin}
                        className="btn btn-outline-light px-5"
                        // type="submit"
                      >
                        Login
                      </button>
                    </div>

                    {/* <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-google fa-lg"></i>
                      </a>
                    </div> */}
                  </div>

                  {/* <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <a href="#!" className="text-white-50 fw-bold">
                        Sign Up
                      </a>
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
