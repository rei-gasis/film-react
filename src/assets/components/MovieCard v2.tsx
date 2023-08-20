import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../styles/MovieCard.scss";

interface Props {
  id: string;
  img?: string;
  rating?: number;
}

function MovieCard({ id, img }: Props) {
  const [isSelected, setSelected] = useState(false);
  const [blurClass, setBlurClass] = useState("");
  const [btnHoverClass, setBtnHoverClass] = useState("");

  const cardStyle = {
    width: "16rem",
    height: "25rem",
  };

  const nav = useNavigate();
  const BLUR_IMG_CLASS = "blur-img";
  const BTN_HOVER_CLASS = "btn-hover";

  const test = "block";
  return (
    <Card className="movie-card">
      <Card.Img
        variant="top"
        src={img}
        className={`movie-card-img ${blurClass}`}
        onMouseOver={() => {
          setBlurClass(BLUR_IMG_CLASS);
          setBtnHoverClass(BTN_HOVER_CLASS);
        }}
        onMouseLeave={() => {
          setBlurClass("");
          setBtnHoverClass("");
        }}
      />
      <Button
        style={{
          display: "none",
          position: "absolute",
          right: "15px",
          bottom: "15px",
        }}
        className={`button ${btnHoverClass}`}
        onMouseOver={() => {
          setBlurClass(BLUR_IMG_CLASS);
        }}
        onMouseLeave={() => {
          setBlurClass("");
        }}
        onClick={() => nav("/review-movie/" + id)}
      >
        <i className="bi bi-pencil"></i>
      </Button>
      <Button
        style={{
          display: "none",
          position: "absolute",
          right: "60px",
          bottom: "15px",
        }}
        className={`button ${btnHoverClass}`}
        onMouseOver={() => {
          setBlurClass(BLUR_IMG_CLASS);
        }}
        onMouseLeave={() => {
          setBlurClass("");
        }}
        onClick={() => nav("/info-movie/" + id)}
      >
        <i className="bi bi-info-circle"></i>
      </Button>
    </Card>
  );
}

export default MovieCard;


.movie-card {
  .movie-card-img {
      .blur-img:hover{
          filter: blur(2px);
      }
  }
  .btn-hover {
      display: block !important;
      // &:hover {
      //     filter:blur(2px);
      // }
  }
  
}