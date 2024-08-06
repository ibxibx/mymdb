import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "American Beauty",
      genre: "Drama",
      image:
        "https://upload.wikimedia.org/wikipedia/en/a/a0/American_Beauty_poster.jpg",
      director: "Sam Mendes",
      actors: "Kevin Spacey, Annette Bening, Thora Birch",
      description:
        "A sexually frustrated suburban father has a mid-life crisis after becoming infatuated with his daughter's best friend.",
    },
    {
      id: 2,
      title: "Interstellar",
      genre: "Drama, Adventure, Sci-Fi",
      image:
        "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
      director: "Christopher Nolan",
      actors: "Anne Hathaway, Matt Damon, Matthew McConaughey",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    },
    {
      id: 3,
      title: "Inception",
      genre: "Drama",
      image:
        "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg",
      director: "Christopher Nolan",
      actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. ",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

export default MainView;
