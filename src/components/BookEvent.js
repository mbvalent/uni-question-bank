import React from "react";
import { Alert, Card, Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import app from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import firebase from "firebase";
import emailjs from "emailjs-com";
import { useEffect } from "react";
import { useRef } from "react";

const BookEvent = ({ match }) => {
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAdderess] = useState("");
  const [email, setEmail] = useState("");
  const [additionalRequest, setAdditionalRequest] = useState("");
  const [entries, setEntries] = useState("");
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState(0);
  const [event, setEvent] = useState("");

  const [error, setError] = useState("");

  const nameRef = useRef();

  const sendMail = (entryIdForEntry) => {
    let templateParams = {
      event_name: event.name,
      firstName: firstName,
      email: email,
      entry_id: entryIdForEntry,
      event_date: event.selectedDate,
    };

    emailjs
      .send(
        "service_akmqqtn",
        "template_8av2o18",
        templateParams,
        "user_EvJTfvxtiOvUWLPO6SIKM"
      )
      .then(
        function (response) {
          console.log("SUCCESS! mail sent ", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  const ref = app.firestore().collection("event");

  useEffect(() => {
    nameRef.current.focus();
    async function getDoc(id) {
      const snapshot = await ref.doc(id).get();
      const data = snapshot.data();
      setEvent(data);
    }
    getDoc(match.params.id);
  }, []);

  const handlePayment = (entries) => {
    setEntries(entries);
    setPayment(event.price * entries);
  };

  const validationRules = (attendee) => {
    if (
      attendee.firstName === "" ||
      attendee.email === "" ||
      attendee.entries === "" ||
      attendee.phone === ""
    ) {
      return true;
    }
    return false;
  };

  function handleBookEvent() {
    if (entries > event.totalSeats) {
      return;
    }
    let entryIdForEntry = uuidv4();
    let attendee = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      additionalRequest: additionalRequest,
      address: address,
      phone: phone,
      entries: entries,
      entryId: entryIdForEntry,
    };
    if (validationRules(attendee)) {
      window.scrollTo(0, 0);
      return setError("Please fill all required fields (*)");
    }
    setLoading(true);
    ref
      .doc(match.params.id)
      .update({
        registeredUser: firebase.firestore.FieldValue.arrayUnion(attendee),
        totalSeats: event.totalSeats - entries,
      })
      .then(() => {
        sendMail(entryIdForEntry);
        setLoading(false);
        toast.success(
          `Booking for ${event.name} added successfully! check your mail.`,
          {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        document.getElementById("rest-form").reset();
        setPayment(0);
      })
      .catch((err) => {
        setLoading(false);

        console.error(err);
      });
  }
  return event.totalSeats <= 0 ? (
    <Redirect to="/events" />
  ) : (
    <div>
      <Header />

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

      <h1 style={{ marginTop: "100px" }} className="text-center display-4">
        BOOK EVENT
      </h1>

      <h2 className="text-secondary text-center ">{event.name}</h2>

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{
          marginTop: "25px",
          marginBottom: "100px",
          minHeight: "100vh",
        }}
      >
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <Card className="shadow bg-light">
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <form id="rest-form">
                <div className="row mb-2">
                  <div className="col">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form6Example1"
                        ref={nameRef}
                        required={true}
                        className=" form-control"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <label className="mt-1 form-label" for="form6Example1">
                        First name*
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form6Example2"
                        className="form-control"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <label className="mt-1 form-label" for="form6Example2">
                        Last name
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-2">
                  <input
                    type="tel"
                    id="form6Example3"
                    className="form-control"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label className="mt-1 form-label" for="form6Example3">
                    Phone Number*
                  </label>
                </div>

                <div className="form-outline mb-2">
                  <input
                    type="text"
                    id="form6Example4"
                    className="form-control"
                    onChange={(e) => setAdderess(e.target.value)}
                  />
                  <label className="mt-1 form-label" for="form6Example4">
                    Address
                  </label>
                </div>

                <div className="form-outline mb-2">
                  <input
                    type="email"
                    id="form6Example5"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="mt-1 form-label" for="form6Example5">
                    Email*
                  </label>
                </div>
                <div className="form-outline mb-2">
                  <input
                    type="number"
                    id="form6Example5"
                    className="form-control"
                    onChange={(e) => handlePayment(e.target.value)}
                    min="1"
                    max="10"
                  />
                  <label className="mt-1 form-label" for="form6Example5">
                    Entries*
                  </label>
                </div>

                <div className="form-outline mb-2">
                  <textarea
                    className="form-control"
                    id="form6Example7"
                    rows="4"
                    onChange={(e) => setAdditionalRequest(e.target.value)}
                  ></textarea>
                  <label className="mt-1 form-label" for="form6Example7">
                    Additional Request
                  </label>
                </div>
                <div className="form-outline mb-2">
                  <p className="mt-1 form-label">
                    Total Amount: Rs.{payment}/-
                    <small className="text-muted"> (INCL. OF ALL TAXES)</small>
                  </p>
                </div>
              </form>
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary btn-block mb-2"
                onClick={handleBookEvent}
              >
                Proceed To Payments <i className="far fa-credit-card"></i>
              </button>
            </Card.Body>
          </Card>

          <Link className="mt-5 btn btn-lg btn-light" to="/events">
            <i className="far fa-hand-point-left"></i> Back to Events
          </Link>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default BookEvent;
