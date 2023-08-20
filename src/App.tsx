import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ReviewMovie from "./assets/components/ReviewMovie";
import PageNotFound from "./assets/components/PageNotFound";

import "./assets/data/dummymovies";

import { dummyMovies } from "./assets/data/dummymovies";
import Login from "./assets/components/Login";
import Home from "./assets/components/Home";

import { AuthProvider, RequireAuth, useIsAuthenticated } from "react-auth-kit";
import PrivateRoute from "./assets/components/PrivateRoute";
import UserReviewList from "./assets/components/UserReviewList";

import "../src/assets/styles/base.scss";
import "../src/assets/styles/App.scss";

interface PrivateRouteProps {
  Component: any;
  cProps?: any;
}

function App() {
  const [movies, setMovies] = useState<typeof dummyMovies | any[]>([]);

  const showSearchedMovies = (res: typeof dummyMovies) => {
    setMovies(res);
  };

  useEffect(() => {
    setMovies(dummyMovies); //@TODO: remove temp
  }, []);

  return (
    <div className="App">
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/movie-list" element={<Home />} />

              <Route
                path="/review-movie/:id"
                element={
                  <>
                    <ReviewMovie movies={movies} />
                  </>
                }
              />
              <Route
                path="/user-reviews/"
                element={
                  <>
                    <UserReviewList />
                  </>
                }
              />
            </Route>

            {/*Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

{
  /* <MovieList header="Search Result: " movies={movies} /> */
}
