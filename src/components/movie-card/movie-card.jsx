import React from "react";
import PropTypes from "prop-types";

const MovieCard = ({ movie, onMovieClick }) => {
  console.log("Movie object:", movie);
  return (
    <div onClick={() => onMovieClick(movie)}>
      <img src={movie.image} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.genre}</p>
      <p>{movie.director}</p>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
