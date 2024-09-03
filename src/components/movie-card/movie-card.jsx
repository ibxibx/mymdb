import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, onToggleFavorite }) => {
  const isFavorite = user && user.FavoriteMovies.includes(movie._id);

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button
          variant={isFavorite ? "danger" : "success"}
          onClick={() => onToggleFavorite(movie._id)}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  user: PropTypes.object,
  onToggleFavorite: PropTypes.func.isRequired,
};
