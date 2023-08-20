import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { useAuthUser } from "react-auth-kit";

import "bootstrap-icons/font/bootstrap-icons.css";
import InformModal from "./InformModal";
import Navbar from "./Navbar";

import "../styles/ReviewMovie.scss";
import movie_placeholder from "../styles/assets/movie-placeholder.png";

interface Props {
  movies?: { id: string; title: string; image: string }[] | undefined;
  user?: string;
}

const ReviewMovie = ({ movies = [], user }: Props) => {
  useEffect(() => {
    document.title = "Review Movie";
    console.log(state);
  }, []);
  const { id } = useParams();
  const { state } = useLocation();
  const authUser = useAuthUser();

  const DEFAULT_RATING = 1;

  const ratings = [
    { rating: 1, isFilled: true },
    { rating: 2, isFilled: false },
    { rating: 3, isFilled: false },
    { rating: 4, isFilled: false },
    { rating: 5, isFilled: false },
  ];

  const [userReview, setUserReview] = useState({
    user: "",
    movieId: "",
    movieTitle: "",
    rating: DEFAULT_RATING,
    movieReview: "",
    movieImg: "", //store IMDB Image URL
  });
  const [rateFill, setRateFill] = useState(ratings);

  //movie attr
  const [movieAttr, setMovieAttr] = useState({
    id: "",
    title: "",
    image: "",
  });

  var selMovie: typeof movieAttr;

  useEffect(() => {
    if (state) {
      setMovieAttr({
        ...movieAttr,
        id: state.id,
        title: state.title,
        image: state.img,
      });

      setUserReview({
        ...userReview,
        user: authUser()?.username,
        movieId: state.id,
        movieTitle: state.title,
        movieImg: state.img,
      });
    } else {
      // alert("Movie not initialized!");
    }
  }, []);

  const handleClickRating = (rate: number) => {
    setRateFill(
      rateFill.map((rating) => {
        if (rate >= rating.rating) return { ...rating, isFilled: true };
        return { ...rating, isFilled: false };
      })
    );
    setUserReview({ ...userReview, rating: rate });
  };

  // const hHoverRating = (rate: number, hover: boolean) => {
  //   setRateHover(
  //     rateHover.map((rating) => {
  //       if (rate >= rating.rating) return { ...rating, isFilled: true };
  //       return { ...rating, isFilled: false };
  //     })
  //   );
  // };

  // const hoverRatings = [
  //   { rating: 1, isFilled: false },
  //   { rating: 2, isFilled: false },
  //   { rating: 3, isFilled: false },
  //   { rating: 4, isFilled: false },
  //   { rating: 5, isFilled: false },
  // ];
  // const [rateHover, setRateHover] = useState(hoverRatings);

  const submitReview = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newReview = { ...userReview };
    // console.log(JSON.stringify(newReview));

    await fetch("http://localhost:5050/api/reviews/post-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => {
        setUserReview({ ...userReview, rating: 1, movieReview: "" });
        setRateFill(
          //reset rating
          rateFill.map((rating) => {
            if (rating.rating != 1) return { ...rating, isFilled: false };
            return { ...rating, isFilled: true };
          })
        );
        setModal({
          ...modal,
          show: true,
          message: "Your Review has been submitted!",
        });

        //auto-close modal
        setTimeout(() => {
          setModal({ ...modal, show: false, message: "" });
        }, 1200);
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  };

  const [modal, setModal] = useState({
    show: false,
    message: "",
  });

  return (
    <>
      <Navbar />
      <Container className="vh-100 px-0 py-3">
        <Row className="mt-2">
          <Col className="col-4 ml-10">
            <Image
              className="img-thumbnail"
              src={movieAttr.image ? movieAttr.image : movie_placeholder}
            />
          </Col>
          <Col className="col-8">
            <h3>{`Review Movie: ${movieAttr.title}`}</h3>
            <Form onSubmit={submitReview}>
              <Form.Group className="mb-1" controlId="rating">
                <Form.Label>Rating &nbsp;</Form.Label>
                {rateFill.map((rate, idx) => {
                  return (
                    <i
                      key={idx}
                      onClick={() => handleClickRating(rate.rating)}
                      // onMouseOver={() => { @TODO:enable hover, change color to orange
                      //   hHoverRating(rate.rating, true);
                      // }}
                      // onMouseLeave={() => {
                      //   hHoverRating(rate.rating, false);
                      // }}
                      className={rate.isFilled ? "star-fill" : "bi bi-star"}
                    ></i>
                  );
                })}
              </Form.Group>

              <Form.Group className="mb-3" controlId="movieReview">
                <Form.Label>Your Thoughts?</Form.Label>
                <Form.Control
                  as="textarea"
                  value={userReview.movieReview}
                  onChange={(e) =>
                    setUserReview({
                      ...userReview,
                      movieReview: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
            <InformModal message={modal.message} shown={modal.show} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ReviewMovie;
