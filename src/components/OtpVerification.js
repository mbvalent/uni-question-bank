import firebase from "firebase";
import { Card, Container, Form, Alert, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";

const OtpVerification = () => {
  const phoneRef = useRef();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleClick = () => {
    setMessage("");
    setLoading(true);
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );

    const phoneNumber = "+91" + phoneRef.current.value;
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (e) {
        // handleShow();
        let code = prompt("enter OTP: ", "");
        if (code == null) return;
        e.confirm(code)
          .then(function (result) {
            toast.success(
              `${result.user.phoneNumber} Verified Successfully :)`,
              {
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            setLoading(false);
            setMessage("phone verification successfull :)");
            console.log(result.user, "user");
            document.querySelector("label").textContent =
              result.user.phoneNumber + " Number Verified";
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
            console.error(err);
          });
      });
  };
  return (
    <div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Otp</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group id="email">
                <Form.Control
                  type="number"
                  placeholder="enter otp"
                  ref={phoneRef}
                  required
                ></Form.Control>
              </Form.Group>
              <div id="recaptcha-container" />
              <Button
                disabled={loading}
                onClick={handleClick}
                className="btn-danger"
                type="submit"
              >
                confirm Otp
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button disabled variant="danger" onClick={handleClose}>
              Resend Otp
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Header />
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
              <Card.Body>
                <h3 className="text-center mb-3">Phone Verification</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form>
                  <Form.Group id="email">
                    <Form.Label>Enter Phone Number:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="enter 10 digit number"
                      ref={phoneRef}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <div id="recaptcha-container" />
                  <Button
                    disabled={loading}
                    onClick={handleClick}
                    className="w-100"
                    type="submit"
                  >
                    Send Otp
                  </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                  <Link to="/login">Login with credentials</Link>
                </div>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
              Need an account? <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </Container>
      </div>

      <label></label>
    </div>
  );
};

export default OtpVerification;
