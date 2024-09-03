import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({
  user,
  token,
  movies,
  onLoggedOut,
  onUserUpdate,
}) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(
    user.Birthday ? user.Birthday.split("T")[0] : ""
  );
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    setFavoriteMovies(
      movies.filter((m) => user.FavoriteMovies.includes(m._id))
    );
  }, [movies, user]);

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
          onUserUpdate(updatedUser);
          setFavoriteMovies(
            movies.filter((m) => updatedUser.FavoriteMovies.includes(m._id))
          );
        }
      })
      .catch((e) => {
        alert(`Error: ${e.message}`);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {};
    if (username !== user.Username) data.Username = username;
    if (email !== user.Email) data.Email = email;
    if (birthday !== user.Birthday) data.Birthday = birthday;
    if (password) data.Password = password;

    if (Object.keys(data).length === 0) {
      alert("No changes to update");
      return;
    }

    fetch(`https://mymdb-c295923140ec.herokuapp.com/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Update failed");
        }
      })
      .then((updatedUser) => {
        alert("Update successful");
        onUserUpdate(updatedUser);
        // If the username was changed, update it in localStorage
        if (data.Username) {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          storedUser.Username = data.Username;
          localStorage.setItem("user", JSON.stringify(storedUser));
        }
      })
      .catch((e) => {
        alert("Something went wrong: " + e.message);
      });
  };

  const handleDeregister = () => {
    fetch(`https://mymdb-c295923140ec.herokuapp.com/users/${user._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        alert("Your account has been deleted");
        onLoggedOut();
      } else {
        alert("Something went wrong");
      }
    });
  };

  const removeFavorite = (movieId) => {
    fetch(
      `https://mymdb-c295923140ec.herokuapp.com/users/${user._id}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to remove movie from favorites");
          return false;
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          setFavoriteMovies(
            movies.filter((m) => updatedUser.FavoriteMovies.includes(m._id))
          );
          onUserUpdate(updatedUser);
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col md={4} lg={3}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Your Profile</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Button
            variant="danger"
            onClick={handleDeregister}
            className="mb-3 w-100"
          >
            Deregister
          </Button>
        </Col>
        <Col md={8} lg={9}>
          <Row className="justify-content-center mb-4">
            <Col xs="auto">
              <h2 className="text-center">Favorite Movies</h2>
            </Col>
          </Row>
          <Row>
            {favoriteMovies.map((movie) => (
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
        </Col>
      </Row>
    </Container>
  );
};
