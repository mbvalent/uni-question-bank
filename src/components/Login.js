import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "./Header";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { logIn } = useAuth();

  const history = useHistory();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
      history.push("/home");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <Header />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-3">Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    required
                  ></Form.Control>
                </Form.Group>

                <Button disabled={loading} className="w-100" type="submit">
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Log In"
                  )}
                </Button>
              </Form>
              <div className="w-100 text-left mt-3">
                <Link to="/forget-password">forgot password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-4">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
