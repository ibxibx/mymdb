import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import MovieView from "./MovieView";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch("https://mymdb-c295923140ec.herokuapp.com/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          const moviesFromApi = data.map((movie) => ({
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            genre: movie.GenreId,
            director: movie.DirectorId,
            actors: movie.Actors,
            image: movie.ImagePath,
          }));
          setMovies(moviesFromApi);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={{
          ...selectedMovie,
          genre: movies.find((m) => m.id === selectedMovie.id)?.genre || "",
          director:
            movies.find((m) => m.id === selectedMovie.id)?.director || "",
        }}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) =>
            setSelectedMovie(newSelectedMovie)
          }
        />
      ))}
    </div>
  );
};

export default MainView;
