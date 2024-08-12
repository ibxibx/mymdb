import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://mymdb-c295923140ec.herokuapp.com/movies"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
      } catch (error) {
        if (isMounted) {
          setError(error.message);
        }
      }
    };

    fetchMovies();

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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem",
      }}
    >
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
