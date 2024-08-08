import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  console.log("MovieView component rendered with movie:", movie);
  return (
    <div className="movie-view">
      <div className="movie-poster">
        <img src={movie.image} alt={movie.title} />
      </div>
      <div className="movie-details">
        <div className="movie-title">
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div className="movie-genre">
          <span>Genre: </span>
          <span>{movie.genre}</span>
        </div>
        <div className="movie-director">
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <div className="movie-actors">
          <span>Actors: </span>
          <span>{movie.actors.join(", ")}</span>
        </div>
        <div className="movie-description">
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
      </div>
      <p>
        <button onClick={onBackClick}>Back</button>
      </p>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
