import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useNavigation } from "react-router-dom";

import "../styles/MovieCard.scss";
import imdb_logo from "../styles/assets/logo-imdb.svg";
import movie_placeholder from "../styles/assets/movie-placeholder.png";

// import "../../movies.scss";

interface Props {
  id: string;
  img?: string;
  imDbRating?: number;
  title?: string;
  showInfo: (show: boolean, movieId: string) => void;
}

function MovieCard({ id, img, imDbRating, title, showInfo }: Props) {
  const [hoverClass, setHoverClass] = useState("");

  //@TODO: write common Props here
  // const propPack = {
  //   variousProps1: variousProps1,
  //   variousProps2: variousProps2,
  //   variousProps3: variousProps3,
  // };

  useEffect(() => {
    // console.log("title", title, "img", img);
  }, []);

  const nav = useNavigate();
  return (
    <Card className="movie-card bg-transparent">
      <Card.Img
        variant="top"
        src={img ? img : movie_placeholder}
        className={`movie-card-img ${hoverClass}`}
        alt={title}
        onMouseOver={() => {
          setHoverClass("hover");
        }}
        onMouseLeave={() => {
          setHoverClass("");
        }}
      />
      <Card.Body>{title}</Card.Body>
      <div
        className={`${hoverClass} imdb`}
        style={{
          position: "absolute",
          zIndex: -1,
          color: "white",
        }}
        onMouseOver={() => {
          setHoverClass("hover");
        }}
        onMouseLeave={() => {
          setHoverClass("");
        }}
      >
        {/* {!imDbRating && (
          <>
            <span>{imDbRating}</span>
            <p>
              <img src={imdb_logo} />
            </p>
          </>
        )} */}
      </div>
      {/* {!img && (
        <div className="title">
          <h4>{title}</h4>
        </div>
      )} */}
      {/* {!img && (
        <h3
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            margin: "auto",
            transform: "translateY(-50%)",
          }}
        >
          {title}
        </h3>
      )} */}

      <Button
        style={{
          display: "none",
          position: "absolute",
          top: "15px",
          right: "15px",
        }}
        className={`${hoverClass} "button"`}
        onMouseOver={() => {
          setHoverClass("hover");
        }}
        onMouseLeave={() => {
          setHoverClass("");
        }}
        onClick={() =>
          nav("/review-movie/" + id, { state: { id, img, title } })
        }
      >
        <i className="bi bi-pencil"></i>
      </Button>
      <Button
        style={{
          display: "none",
          position: "absolute",
          top: "60px",
          right: "15px",
        }}
        className={`${hoverClass} "button"`}
        onMouseOver={() => {
          setHoverClass("hover");
        }}
        onMouseLeave={() => {
          setHoverClass("");
        }}
        onClick={(e: React.SyntheticEvent) => {
          showInfo(true, id);

          // console.log(e?.pageY);
          // console.log(window.outerHeight / 2);
        }}
      >
        <i className="bi bi-info-circle"></i>
      </Button>
    </Card>
  );
}

export default MovieCard;
