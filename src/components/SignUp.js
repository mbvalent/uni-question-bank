import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Spinner, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import app from "../firebase";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SignUp() {
  const emailRef = useRef();
  const fnameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUp } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [enrollment, setEnrollment] = useState('');


  useEffect(() => {
    fnameRef.current.focus();
  }, []);

  const ref = app.firestore().collection("users");

  const isValidFields = () => {
    if(!firstName || !lastName || !emailRef.current.value || !enrollment || !selectedDate){
      return false;
    }
    return true;
  }

  function addUser() {
    if(!isValidFields()){
      return setError("Fill all required fields!");
    };
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: emailRef.current.value,
      enrollment: enrollment,
      dateOfAdmission: selectedDate
    };

    ref
      //.doc() use if for some reason you want that firestore generates the id
      .doc(uuidv4())
      .set(newUser)
      .then(() => {
        console.log("user data added successfully!!");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("passwords don't match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      addUser();
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <Header />
      <Container
        className="mt-5 d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className=" w-100" style={{ maxWidth: "500px" }}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} id="firstName">
                    <Form.Label>First Name*</Form.Label>
                    <Form.Control
                      type="text"
                      ref={fnameRef}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} id="lastName">
                    <Form.Label>Last Name*</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} id="enrollment number">
                    <Form.Label>Enrollment no.*</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setEnrollment(e.target.value)}
                      placeholder="2017/CTAE/213"
                      required
                      pattern="^[0-9]+/[a-zA-Z]+/[0-9]+$"
                    ></Form.Control>
                  </Form.Group>
                  
                  
                  <Form.Group as={Col} id="lastName">
                    <Form.Label>Date of Admission*</Form.Label>
                    <DatePicker
                      className="w-100 form-control"
                      selected={selectedDate}
                      dateFormat="Pp"
                      // timeIntervals={15}
                      // isClearable
                      // showTimeSelect
                      // timeFormat="p"
                      showYearDropdown
                      scrollableMonthYearDropdown
                      required
                      onChange={(date) => setSelectedDate(date)}
                    />
                  </Form.Group>
                </Row>
                <Form.Group id="email">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password*</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirm*</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
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
                    "Sign Up"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-4">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
