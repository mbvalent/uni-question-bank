import { Alert } from "bootstrap";
import React, { useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Footer from "./Footer";
import Header from "./Header";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logOut } = useAuth();

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

  return (
    <>
      <Header />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email: </strong> {currentUser.email}
              <Link to="/update-profile" className="btn btn-primary mt-3 w-100">
                Update Profile
              </Link>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button
              className="shadow-none"
              variant="link"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
