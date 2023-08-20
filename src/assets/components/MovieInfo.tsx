import { Col, Container, Modal, Row } from "react-bootstrap";
import imdb_logo from "../styles/assets/logo-imdb.svg";

import "../styles/MovieInfo.scss";

interface Props {
  showInfo: (val: boolean, movieId: string) => void;
  movieInfo: {
    title: string;
    plot?: string;
    director?: string;
    year?: number;
    genre: string;
    imDbRating?: number;
  };
  showModal: boolean;
}

const MovieInfo = ({ showModal, showInfo, movieInfo }: Props) => {
  return (
    <>
      <Modal show={showModal}>
        <Modal.Body>
          <Row>
            <Col className="col-12 d-flex flex-row justify-content-end flex-wrap mb-2">
              <button
                className="button btn-primary"
                onClick={() => {
                  showInfo(false, "");
                }}
              >
                Close
              </button>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 d-flex align-content-start flex-wrap">
              <div className="grid">
                <div className="row ">
                  <div className="col-12">
                    <h3>{movieInfo.title}</h3>
                  </div>
                  <div className="col-12">
                    <span>
                      <img src={imdb_logo} />
                      &nbsp;
                      {movieInfo.imDbRating}
                    </span>
                  </div>
                  <div className="col-12">
                    <span>Year: {movieInfo.year}</span>
                  </div>
                  <div className="col-12">
                    <span>Genre: {movieInfo.genre}</span>
                  </div>
                  <div className="col-12">
                    <p>Director: {movieInfo.director}</p>
                  </div>

                  <div className="col-12">
                    <h6>Summary</h6>
                    <p>{movieInfo.plot}</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MovieInfo;
