import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetchMovies(token);
  }, [token]);

  const fetchMovies = (token) => {
    if (!token) return;
    fetch("https://mymdb-c295923140ec.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Director: movie.Director,
            Description: movie.Description,
            Genres: movie.Genres,
            Actors: movie.Actors,
            Featured: movie.Featured,
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  };

  const toggleFavorite = (movieId) => {
    const isFavorite = user.FavoriteMovies.includes(movieId);
    const method = isFavorite ? "DELETE" : "POST";

    fetch(
      `https://mymdb-c295923140ec.herokuapp.com/users/${user._id}/movies/${movieId}`,
      {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            isFavorite
              ? "Failed to remove movie from favorites"
              : "Failed to add movie to favorites"
          );
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      })
      .catch((e) => {
        console.error("Error toggling favorite:", e);
      });
  };

  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const addFavorite = (movieId) => {
    fetch(
      `https://mymdb-c295923140ec.herokuapp.com/users/${user._id}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to add movie to favorites");
          return false;
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          alert("Movie successfully added to Favorites"); // Add this line
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Container>
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={onLoggedIn} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView movies={movies} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <ProfileView
                      user={user}
                      token={token}
                      movies={movies}
                      onLoggedOut={onLoggedOut}
                      onUserUpdate={(updatedUser) => setUser(updatedUser)}
                    />
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Row className="g-4">
                      {movies.map((movie) => (
                        <Col
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          key={movie._id}
                          className="mb-4"
                        >
                          <MovieCard
                            movie={movie}
                            user={user}
                            onToggleFavorite={toggleFavorite}
                          />
                        </Col>
                      ))}
                    </Row>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </>
  );
};
