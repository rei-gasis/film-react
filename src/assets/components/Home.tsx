import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MovieList from "./MovieList";

import { dummyMovies } from "../data/dummymovies";
import Navbar from "./Navbar";

import "../styles/Home.scss";

const Home = () => {
  const [movies, setMovies] = useState<typeof dummyMovies | any[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const showSearchedMovies = (res: typeof dummyMovies) => {
    setMovies(res);
  };

  const showSearchKeyword = (res: string) => {
    setSearchKeyword(res);
  };

  useEffect(() => {
    // setMovies(dummyMovies); //@TODO: remove temp
  }, []);

  return (
    <>
      <Navbar
        callbackMovies={showSearchedMovies}
        callbackSearchKeyword={showSearchKeyword}
      />
      <Container className="vh-100 px-0 py-3">
        <Row>
          <Col className="col-12">
            <MovieList header={searchKeyword} movies={movies} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
