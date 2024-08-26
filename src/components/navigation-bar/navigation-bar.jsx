import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";
import logoImage from "./mymdb-logo.png"; // Import the image

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logoImage} // Use the imported image
            width="140"
            height="140"
            className="d-inline-block align-top"
            alt="MyMDB logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/profile" className="nav-item">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/update-profile" className="nav-item">
                  Update Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} className="nav-item">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
