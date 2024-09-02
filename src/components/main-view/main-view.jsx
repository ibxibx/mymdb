import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Container, Button, Form, Modal } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [showDirectorModal, setShowDirectorModal] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState("");
  const [directorSearch, setDirectorSearch] = useState("");

  useEffect(() => {
    if (!token) return;
    fetchMovies(token);
    fetchGenres(token);
    fetchDirectors(token);
  }, [token]);

  useEffect(() => {
    filterMovies();
  }, [movies, selectedGenres, selectedDirector]);

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

  const fetchGenres = (token) => {
    fetch("https://mymdb-c295923140ec.herokuapp.com/genres", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setGenres(data))
      .catch((error) => console.error("Error fetching genres:", error));
  };

  const fetchDirectors = (token) => {
    fetch("https://mymdb-c295923140ec.herokuapp.com/directors", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setDirectors(data))
      .catch((error) => console.error("Error fetching directors:", error));
  };

  const filterMovies = () => {
    let filtered = movies;
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((movie) =>
        movie.Genres.some((genre) => selectedGenres.includes(genre.Name))
      );
    }
    if (selectedDirector) {
      filtered = filtered.filter(
        (movie) => movie.Director.Name === selectedDirector
      );
    }
    setFilteredMovies(filtered);
  };

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedDirector("");
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
                    <>
                      <Col xs={12} className="mb-4">
                        <div className="d-flex justify-content-center align-items-center">
                          <span className="me-2">Filter Movies by</span>
                          <Button
                            variant={
                              selectedGenres.length > 0
                                ? "primary"
                                : "outline-primary"
                            }
                            className="me-2"
                            onClick={() => setShowGenreModal(true)}
                          >
                            Genre
                            {selectedGenres.length > 0 && (
                              <span
                                className="ms-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedGenres([]);
                                }}
                              >
                                &#x2715;
                              </span>
                            )}
                          </Button>
                          <Button
                            variant={
                              selectedDirector ? "primary" : "outline-primary"
                            }
                            onClick={() => setShowDirectorModal(true)}
                          >
                            Director
                            {selectedDirector && (
                              <span
                                className="ms-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDirector("");
                                }}
                              >
                                &#x2715;
                              </span>
                            )}
                          </Button>
                        </div>
                      </Col>
                      <Row className="g-4">
                        {(filteredMovies.length > 0
                          ? filteredMovies
                          : movies
                        ).map((movie) => (
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
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
      {/* Genre Modal */}
      <Modal show={showGenreModal} onHide={() => setShowGenreModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Genres</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {genres.map((genre) => (
            <Form.Check
              key={genre._id}
              type="checkbox"
              label={genre.Name}
              checked={selectedGenres.includes(genre.Name)}
              onChange={() => toggleGenre(genre.Name)}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGenreModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Director Modal */}
      <Modal
        show={showDirectorModal}
        onHide={() => setShowDirectorModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Director</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Search directors"
            value={directorSearch}
            onChange={(e) => setDirectorSearch(e.target.value)}
          />
          {directors
            .filter((director) =>
              director.Name.toLowerCase().includes(directorSearch.toLowerCase())
            )
            .map((director) => (
              <Button
                key={director._id}
                variant="link"
                onClick={() => {
                  setSelectedDirector(director.Name);
                  setShowDirectorModal(false);
                }}
              >
                {director.Name}
              </Button>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDirectorModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
