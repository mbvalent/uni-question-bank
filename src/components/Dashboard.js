import { Alert } from "bootstrap";
import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Footer from "./Footer";
import Header from "./Header";
import app from "../firebase";


const Dashboard = () => {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState('')
  const { currentUser, logOut } = useAuth();
  const [shallShowEnrollment, setShallShowEnrollment] = useState(true)

  const history = useHistory();
  const ref = app.firestore().collection("users");

  useEffect(() => {
    if(currentUser.email == process.env.REACT_APP_ADMIN_ID){
      setShallShowEnrollment(false);
    }
    ref.where("email", "==", currentUser.email)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setUserData(doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }, [])
  

  async function handleLogout(e) {
    setError("");
    try {
      await logOut();
      history.push("/login");
    } catch (error) {
      setError(error.message);
    }
  }

  


  const renderEnrollment = () => {
    if(shallShowEnrollment){
      return <strong>Enrollment No.: </strong>
    } else{
      return;
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
              <strong>Email: </strong> {currentUser.email}<br/><br/>
              <strong>First Name: </strong> {userData.firstName}<br/><br/>
              <strong>Last Name: </strong> {userData.lastName}<br/><br/>
              {renderEnrollment()} {shallShowEnrollment && userData.enrollment}
              {/* <strong>Date of Admission: </strong> {userData.dateOfAdmission} */}
              <Link to="/update-profile" className="btn btn-primary mt-3 w-100">
                Update Profile
              </Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
