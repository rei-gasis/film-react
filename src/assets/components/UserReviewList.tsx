import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAuthUser } from "react-auth-kit";
import { Col, Container, Row } from "react-bootstrap";
import UserReview from "./UserReview";

import "../styles/UserReview.scss";

const UserReviewList = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const user = useAuthUser();

  const BASE_URL = import.meta.env?.VITE_BASE_URL;
  const PORT = import.meta.env?.VITE_PORT;

  const getUserReviews = async () => {
    const apiURL = BASE_URL + ":" + PORT + "/api/reviews/" + user()?.username;
    console.log(apiURL);
    await fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReviews(data);
      })
      .catch((error) => {
        console.log(error);
        window.alert(error);
        return;
      });
  };

  useEffect(() => {
    getUserReviews();
  }, []);

  return (
    <>
      <Navbar />
      {reviews.length == 0 && <h1>No reviews yet</h1>}
      <ul className="list-group list-group-numbered">
        {reviews.length > 0 &&
          reviews.map((r, idx) => {
            return (
              <li
                key={idx}
                className="list-group-item d-flex align-items-start flex-column py-3"
              >
                <UserReview
                  key={idx}
                  movieReview={r.movieReview}
                  movieTitle={r.movieTitle}
                  rating={r.rating}
                  movieImg={r.movieImg}
                ></UserReview>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default UserReviewList;
