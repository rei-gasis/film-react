import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import MovieInfo from "./MovieInfo";
import tmdbAPIConfig from "../../../config";

interface Props {
  header: string;
  movies?: any[] | undefined;
}

function MovieList({ header, movies = [] }: Props) {
  useEffect(() => {}, []);
  const [showInfo, setShowInfo] = useState(false);
  const [movieInfo, setMovieInfo] = useState({
    title: "",
    plot: "",
    director: "",
    year: undefined,
    genre: "",
    imDbRating: undefined,
  });

  const apiAction = "Title";
  const { tmdb_base_url, tmdb_api_key } = tmdbAPIConfig;
  const hShowInfo = async (val: boolean, movieId: string) => {
    //fetch data
    if (val && movieId != null) {
      let url =
        tmdb_base_url + "/" + apiAction + "/" + tmdb_api_key + "/" + movieId;
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setMovieInfo({
            title: data.title,
            director: data.directors,
            plot: data.plot,
            genre: data.genres,
            imDbRating: data.imDbRating,
            year: data.year,
          });
          setShowInfo(true);
        });
    } else {
      setShowInfo(false);
      setMovieInfo({
        title: "",
        plot: "",
        director: "",
        year: undefined,
        genre: "",
        imDbRating: undefined,
      });
    }
  };
  const LG_CNT = 6;

  return (
    <div className="my-2">
      {header != "" && <h3 className="title">Search Results: {header}</h3>}
      {movies.length === 0 && <h3 className="title">Movies not found</h3>}
      {showInfo && (
        <MovieInfo
          showModal={showInfo}
          showInfo={hShowInfo}
          movieInfo={movieInfo}
        />
      )}
      <Row xs={1} md={4} lg={LG_CNT} className="g-3">
        {movies.map((m, index) => {
          let render = null;

          // console.log("backdrop_path", m.backdrop_path);
          render = (
            <Col key={m.id}>
              <MovieCard
                id={m.id}
                img={m.img}
                title={m.title}
                showInfo={hShowInfo}
              />
            </Col>
          );
          return render;
        })}
      </Row>
    </div>
  );
}

export default MovieList;

/* <ul className="list-group">
      {/* { {movies.map((movie, index) => (
          <li
            className={`list-group-item  ${
              selectedIndex === index ? "hover" : null
            }`}
            key={movie}
            onClick={() => setSelectedIndex(index)}
            // onMouseOver={() => alert(movie)}
          >
            {movie}
          </li>
        ))}*/
