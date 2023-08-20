import React from "react";
import movie_placeholder from "../styles/assets/movie-placeholder.png";

interface Props {
  movieTitle: string | undefined;
  movieImg?: string;
  rating: number;
  movieReview: string;
}

const UserReview = ({ movieTitle, rating, movieReview, movieImg }: Props) => {
  return (
    <>
      <div className="d-flex align-items-center">
        <img
          src={movieImg ? movieImg : movie_placeholder}
          className="img-thumbnail"
          style={{ width: "150px", height: "150px" }}
        />
        <div className="ms-3 d-flex flex-column align-content-end">
          <p className="fw-bold mb-1">
            {movieTitle} &nbsp;
            {/* <span>
              {Array.from({ length: rating }).map((star, idx) => {
                return <i key={idx} className="star-fill"></i>;
              })}
            </span> */}
            <span className="rounded rating">
              <i className="star-fill"></i>
              {rating + ".0"}
            </span>
          </p>

          <i className="mb-0 review">"{movieReview}"</i>
        </div>
      </div>
    </>
  );
};

export default UserReview;

{
  /* <div className="ms-3">
        
        
    </div>
    </div>
    <a className="btn btn-link btn-rounded btn-sm" href="#" role="button">
    View
    </a>
    </div> */
}
