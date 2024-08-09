import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  console.log("MovieView component rendered with movie:", movie);
  return (
    <div className="movie-view">
      <div className="movie-poster">
        <img src={movie.ImagePath} alt={movie.Title} />
      </div>
      <div className="movie-details">
        <div className="movie-title">
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div className="movie-genre">
          <span>Genre: </span>
          <span>{movie.GenreId}</span>
        </div>
        <div className="movie-director">
          <span>Director: </span>
          <span>{movie.DirectorId}</span>
        </div>
        <div className="movie-actors">
          <span>Actors: </span>
          <span>{movie.Actors.join(", ")}</span>
        </div>
        <div className="movie-description">
          <span>Description: </span>
          <span>{movie.Description}</span>
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
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    GenreId: PropTypes.string.isRequired,
    DirectorId: PropTypes.string.isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
