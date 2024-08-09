import React from "react";
import PropTypes from "prop-types";

const MovieCard = ({ movie, onMovieClick }) => {
  console.log("Movie object:", movie);
  return (
    <div onClick={() => onMovieClick(movie)}>
      <img src={movie.imagePath} alt={movie.Title} />
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
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
