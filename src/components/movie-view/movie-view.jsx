export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} alt={movie.Title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Genres: </span>
        <span>{movie.Genres.map((g) => g.genre).join(", ")}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.name}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.Actors.join(", ")}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birthYear: PropTypes.number.isRequired,
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
  onBackClick: PropTypes.func.isRequired,
};
