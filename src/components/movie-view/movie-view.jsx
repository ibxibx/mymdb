export const MovieView = ({ movie, onBackClick }) => {
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
          <span>{movie.actors}</span>
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
