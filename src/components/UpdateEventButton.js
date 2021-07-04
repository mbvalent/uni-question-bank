import React from "react";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import app from "../firebase";
import DatePicker from "react-datepicker";

const UpdateEventButton = ({ event }) => {
  const [updatedName, setupdatedName] = useState(event.name);
  const [updatedDescription, setupdatedDescription] = useState(
    event.description
  );
  const [updatedImage, setupdatedImage] = useState(event.image);
  const [updatedPrice, setupdatedPrice] = useState(event.price);
  const [updatedTotalSeats, setupdatedTotalSeats] = useState(event.totalSeats);

  const [updatedSelectedDate, setupdatedSelectedDate] = useState(
    new Date(event.selectedDate)
  );
  const [loading, setLoading] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleUpdateModalShow = () => setShowUpdateModal(true);
  const ref = app.firestore().collection("event");
  // UPDATE FUNCTION
  function updateEvent() {
    setLoading(true);
    let updatedEvent = {
      name: updatedName,
      description: updatedDescription,
      image: updatedImage,
      price: updatedPrice,
      selectedDate: String(updatedSelectedDate),
      totalSeats: parseInt(updatedTotalSeats),
    };
    console.log(event.id);
    console.log(updatedEvent);
    ref
      .doc(event.id)
      .update(updatedEvent)
      .then(() => {
        handleUpdateModalClose();
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <div className="mt-3">
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="rest-form" className="p-2">
            <div className="form-outline mb-2">
              <input
                type="text"
                id="form6Example3"
                className="form-control"
                value={updatedName}
                onChange={(e) => setupdatedName(e.target.value)}
                required
              />
              <label className="mt-1 form-label">Event Name*</label>
            </div>

            <div className="row mb-2">
              <div className="ml-3 mr-5 form-outline">
                <DatePicker
                  className="form-control"
                  selected={updatedSelectedDate}
                  dateFormat="Pp"
                  timeIntervals={15}
                  minDate={new Date()}
                  isClearable
                  showTimeSelect
                  timeFormat="p"
                  onChange={(date) => setupdatedSelectedDate(date)}
                />
                <label className="d-block mt-1 form-label">Date & Time*</label>
              </div>
              <div className="ml-3 d-inline mr-3 form-outline">
                <input
                  type="number"
                  id="form6Example2"
                  className="form-control"
                  min="0"
                  disabled
                  value={updatedTotalSeats}
                  onChange={(e) => setupdatedTotalSeats(e.target.value)}
                />
                <label className="mt-1 form-label">Total Seats</label>
              </div>
            </div>

            <div className="form-outline mb-2">
              <input
                type="text"
                id="form6Example5"
                className="form-control"
                value={updatedImage}
                onChange={(e) => setupdatedImage(e.target.value)}
              />
              <label className="mt-1 form-label">Image</label>
            </div>

            <div className="form-outline mb-2">
              <input
                type="number"
                min="0"
                id="form6Example6"
                className="form-control"
                value={updatedPrice}
                onChange={(e) => setupdatedPrice(e.target.value)}
              />
              <label className="mt-1 form-label">Price ($)</label>
            </div>

            <div className="form-outline">
              <textarea
                className="form-control"
                id="form6Example7"
                rows="4"
                value={updatedDescription}
                onChange={(e) => setupdatedDescription(e.target.value)}
              ></textarea>
              <label className="mt-1 form-label">Description</label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateModalClose}>
            Close
          </Button>
          <Button onClick={updateEvent} disabled={loading} variant="primary">
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Update Event"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <Button
        onClick={handleUpdateModalShow}
        className="btn-block shadow-none"
        variant="outline-secondary"
        type="button"
      >
        Update Event <i className="far fa-edit"></i>
      </Button>
    </div>
  );
};

export default UpdateEventButton;
