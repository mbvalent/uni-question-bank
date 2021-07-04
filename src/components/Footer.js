import React from "react";
// import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark py-5">
      <div className="container">
        <div className="small text-center text-muted">
          All right reserved &copy; {new Date().getFullYear()} MPUAT. For website updation & queries contact: web.mpuat@mpuat.ac.in, web.mpuat@gmail.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
