// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";

// import {
//   Button,
//   Col,
//   Row,
//   ListGroup,
//   Card,
//   Container,
//   Carousel,
//   Spinner,
//   Modal,
// } from "react-bootstrap";
// import { Link, useHistory } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import app from "../firebase";
// import Header from "./Header";
// import UpdateEventButton from "./UpdateEventButton";

// const ViewEvent = ({ match }) => {
//   const [event, setEvent] = useState("");
//   const { currentUser } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [show, setShow] = useState(false);

//   const ref = app.firestore().collection("event");

//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);

//   //DELETE EVENT
//   const handleDeleteEvent = () => {
//     ref
//       .doc(event.id)
//       .delete()
//       .catch((err) => {
//         console.error("Error in delete: " + err);
//       });
//     history.push("/events");
//   };

//   let history = useHistory();
//   const handleBook = () => history.push(`/book-event/${event.id}`);

//   useEffect(() => {
//     try {
//       setLoading(true);
//       let id = match.params.id;
//       async function getDoc(id) {
//         const snapshot = await ref.doc(id).get();
//         const data = snapshot.data();
//         if (data) {
//           setLoading(false);
//         }
//         console.log("DATA " + JSON.stringify(data));
//         setEvent(data);
//       }
//       getDoc(id);
//     } catch (e) {
//       setLoading(false);
//       console.error("Error: " + e);
//     }
//     // eslint-disable-next-line
//   }, [match.params.id]);

//   let adminButtons = null;

//   if (currentUser) {
//     if (process.env.REACT_APP_ADMIN_ID === currentUser.email) {
//       adminButtons = (
//         <>
//           <Button
//             onClick={handleShow}
//             className="btn-block shadow-none"
//             variant="outline-danger"
//             type="button"
//           >
//             Delete Event <i className="far fa-trash-alt"></i>
//           </Button>
//           {event !== "" && <UpdateEventButton event={event} />}
//         </>
//       );
//     }
//   }

//   return loading ? (
//     <div className="text-center spinner">
//       <Spinner animation="border" variant="dark" role="status" />
//     </div>
//   ) : (
//     <div>
//       <Header />

//       <Modal show={show} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Delete</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Do you really want to delete this event ?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDeleteEvent}>
//             Delete Event
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Container style={{ marginTop: "70px" }}>
//         <Link className="btn btn-lg btn-light my-3" to="/events">
//           <i className="far fa-hand-point-left"></i> Go Back
//         </Link>
//         <Row>
//           <Col md={6}>
//             <div className="shadow-lg">
//               <Carousel>
//                 <Carousel.Item>
//                   <img
//                     className="d-block w-100"
//                     src={event.image}
//                     alt="First slide"
//                   />
//                   <Carousel.Caption>
//                     <h3>Awesome Goodies</h3>
//                     <p>
//                       Nulla vitae elit libero, a pharetra augue mollis interdum.
//                     </p>
//                   </Carousel.Caption>
//                 </Carousel.Item>
//                 <Carousel.Item>
//                   <img
//                     className="d-block w-100"
//                     src="https://images.unsplash.com/photo-1519736927049-de9d69a15bb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"
//                     alt="Second slide"
//                   />

//                   <Carousel.Caption>
//                     <h3>Fun Activities</h3>
//                     <p>
//                       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                     </p>
//                   </Carousel.Caption>
//                 </Carousel.Item>
//                 <Carousel.Item>
//                   <img
//                     className="d-block w-100"
//                     src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
//                     alt="Third slide"
//                   />

//                   <Carousel.Caption>
//                     <h3>Exciting prizes</h3>
//                     <p>
//                       Praesent commodo cursus magna, vel scelerisque nisl
//                       consectetur.
//                     </p>
//                   </Carousel.Caption>
//                 </Carousel.Item>
//               </Carousel>
//             </div>
//             {/* <Image
//               className="shadow bg-yellow "
//               src={event.image}
//               alt={event.name}
//               fluid
//             /> */}
//           </Col>
//           <Col md={3} className="pr-0">
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <h3>{event.name}</h3>
//               </ListGroup.Item>
//               <ListGroup.Item variant="info">
//                 {/* <hr /> */}
//                 Date & Time:
//                 {/* event.selectedDate */}
//                 {/* new Date(event.selectedDate).toDateString() */}
//                 <div>{event.selectedDate}</div>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 Seats Available : <strong>{event.totalSeats}</strong>
//               </ListGroup.Item>
//               <ListGroup.Item>Description: {event.description}</ListGroup.Item>
//             </ListGroup>
//           </Col>
//           <Col md={3}>
//             <Card className="card border-light mb-3">
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Price:</Col>
//                     <Col>
//                       <strong>Rs. {event.price}/-</strong>
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Status:</Col>
//                     <Col>
//                       {event.totalSeats > 0 ? "Available " : "Booked "}
//                       {event.totalSeats > 0 ? (
//                         <i className="far fa-grin-hearts"></i>
//                       ) : (
//                         <i className="fas fa-heart-broken"></i>
//                       )}
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Button
//                     style={
//                       event.totalSeats === 0 ? { cursor: "not-allowed" } : {}
//                     }
//                     onClick={handleBook}
//                     className="btn-block shadow-none"
//                     variant={
//                       event.totalSeats === 0
//                         ? "outline-danger"
//                         : "outline-success"
//                     }
//                     type="button"
//                     disabled={event.totalSeats === 0}
//                   >
//                     Book Event <i className="far fa-credit-card"></i>
//                   </Button>
//                 </ListGroup.Item>
//                 <ListGroup.Item>{adminButtons}</ListGroup.Item>
//               </ListGroup>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default ViewEvent;

import React from 'react'
import { Viewer } from '@react-pdf-viewer/core'; // Import the main component
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // Plugins
import '@react-pdf-viewer/core/lib/styles/index.css'; // Import the styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css'; // Import the styles
import { Worker } from '@react-pdf-viewer/core'; // Worker
import { useState } from 'react';
import pdfFile from '../pdf/sample.pdf';
import { useEffect } from 'react';
import axios from 'axios';

const ViewPaper = ({ match }) => {

  const [defaultPdfFile, setDefaultPdfFile]=useState(`http://localhost:9000/uploads/${match.params.id}`);

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    console.log(defaultPdfFile);
  }, [defaultPdfFile])

  // ---------------------------------------------------------------------------
  // const getPdf = (id) => {
  //   axios
  //     .get(`/uploads/${id}`)
  //     .then((res) => {
  //       console.log('my: ',res.data)
  //       setDefaultPdfFile(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // useEffect(() => {
  //   console.log(match.params.id);
  //   getPdf(match.params.id);
  // }, []);
  // ---------------------------------------------------------------------------

  return (
      <div className='pdf-container'>
        {
          defaultPdfFile&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={defaultPdfFile}
            plugins={[defaultLayoutPluginInstance]} />
          </Worker></>
        }
      {/* if we dont have pdf or viewPdf state is null */}
      {!defaultPdfFile&&<>No pdf file selected</>}
      </div>
  )
}


export default ViewPaper

