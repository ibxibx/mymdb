import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)}>
      <img src={movie.ImagePath} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.GenreId}</p>
      <p>{movie.DirectorId}</p>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    GenreId: PropTypes.string.isRequired,
    DirectorId: PropTypes.string.isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
