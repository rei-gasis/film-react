import { NavLink, useNavigate } from "react-router-dom";

import { useSignOut, useAuthUser } from "react-auth-kit";
import SearchBar from "./SearchBar";
import { useState } from "react";

import "../styles/Navbar.scss";

import { dummyMovies } from "../data/dummymovies";

interface Props {
  callbackMovies?: (movies: any[]) => void;
  callbackSearchKeyword?: (keyword: string) => void;
}

const Navbar = ({ callbackMovies, callbackSearchKeyword }: Props) => {
  const nav = useNavigate();
  const signOut = useSignOut();

  const hLogout = () => {
    signOut();
    nav("/login");
  };

  const authUser = useAuthUser();
  const showSearchedMovies = (res: typeof dummyMovies) => {
    callbackMovies(res);
  };

  const showSearchKeyword = (res: string) => {
    callbackSearchKeyword(res);
    // setSearchKeyword(res);
  };
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <NavLink to="/movie-list" className="navbar-brand" />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            border: "1px white",
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarScroll"
        >
          <form className="d-flex" role="search">
            <SearchBar
              callbackSearchKeyword={showSearchKeyword}
              callbackMovies={showSearchedMovies}
            />
          </form>

          <ul
            className="navbar-nav my-lg-0 navbar-nav-scroll align-items-center justify-content-between"
            style={{ height: "100px !important" }}
          >
            <li className="nav-item">
              <span>
                <NavLink
                  className="nav-link"
                  to="/movie-list"
                  style={({ isActive, isPending }) => {
                    return {
                      textDecoration: "none",
                      color: "#001233",
                      fontWeight: isActive ? "bold" : "",
                    };
                  }}
                >
                  Movie List
                </NavLink>
              </span>
            </li>
            <li className="nav-item me-auto">
              <NavLink
                className="nav-link"
                to="/user-reviews/"
                style={({ isActive, isPending }) => {
                  return {
                    textDecoration: "none",
                    color: "#001233",
                    fontWeight: isActive ? "bold" : "",
                  };
                }}
              >
                Your reviews
              </NavLink>
            </li>

            <li className="nav-item">Welcome {authUser()?.name}</li>
            <li className="nav-item">
              {/* <a style={{ color: "#001233" , cursor: "pointer" }} onClick={hLogout}>
                        Logout
                    </a> */}
              <i
                className="sign-out"
                onClick={hLogout}
                style={{ cursor: "pointer" }}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
