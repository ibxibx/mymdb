import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <Container className="movie-view">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="mb-3">
            <div
              style={{
                width: "400px",
                maxHeight: "717px",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px 10px",
              }}
            >
              <Card.Img
                variant="top"
                src={movie.ImagePath}
                alt={movie.Title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
            <Card.Body>
              <Card.Title as="h2">{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Genres:</strong>{" "}
                {movie.Genres.map((g) => g.genre).join(", ")}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Director:</strong> {movie.Director.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Actors:</strong> {movie.Actors.join(", ")}
              </ListGroup.Item>
            </ListGroup>
            <Card.Footer>
              <Button variant="primary" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        birthPlace: PropTypes.string.isRequired,
        moviesCount: PropTypes.number.isRequired,
      }).isRequired,
      Description: PropTypes.string.isRequired,
      Genres: PropTypes.arrayOf(
        PropTypes.shape({
          genre: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        })
      ).isRequired,
      Actors: PropTypes.arrayOf(PropTypes.string).isRequired,
      Featured: PropTypes.bool,
    })
  ).isRequired,
};
