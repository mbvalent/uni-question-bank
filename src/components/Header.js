import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, Alert, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser, logOut } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleLogout(e) {
    setError("");
    try {
      await logOut();
      history.push("/login");
    } catch (error) {
      setError(error.message);
    }
  }

  let ManageEventsButton;
  let buttons;
  if (currentUser) {
    buttons = (
      <>
        <NavDropdown title="Profile" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">
            <Link className="btn" to="/profile">
              profile details
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.2">
            <Link className="btn" to="/update-profile">
              Update Profile
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
        <LinkContainer onClick={handleLogout} to="/login">
          <Nav.Link>
            <i className="fas fa-sign-out-alt"></i> logout
          </Nav.Link>
        </LinkContainer>
      </>
    );
  } else {
    buttons = (
      <LinkContainer to="/login">
        <Nav.Link>
          <i className="far fa-user"></i> Sign In
        </Nav.Link>
      </LinkContainer>
    );
  }

  if (currentUser) {
    if (process.env.REACT_APP_ADMIN_ID === currentUser.email) {
      ManageEventsButton = (
        <LinkContainer to="/admin-dashboard">
          <Nav.Link>
            {/* <i className="fas fa-plus-circle"></i> */}
            Admin
          </Nav.Link>
        </LinkContainer>
      );
    }
  } else {
    ManageEventsButton = null;
  }

  return (
    <header>
      {error && <Alert variant="danger">{error}</Alert>}
      <Navbar
        className="fixed-top"
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <i className="fas fa-university"></i>
              <strong
                style={{
                  letterSpacing: "3px",
                  padding: "10px",
                }}
              >
                Question Bank
              </strong>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {ManageEventsButton}
              {buttons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
