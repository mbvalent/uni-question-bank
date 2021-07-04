import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import { Container } from "react-bootstrap";

const ViewPaperDetails = () => {
  const [paper, setPaper] = useState({
    branchName: "",
    session: "",
    yearWithSem: "",
    subject: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3003/papers/${id}`);
    setPaper(res.data);
  };
  return (
    <>
      <Header/>
      <Container
        style={{ marginTop:"100px", minHeight: "100vh" }}
      >
          <div className="container w-100 py-4">
            <Link className="btn btn-primary mb-5" to="/admin-dashboard">
              back to Admin DashBoard
            </Link>
            <h1 className="display-4">{paper.subject}</h1>
            <hr />
            <ul className="list-group w-50">
              <li className="list-group-item">Branch Name: {paper.branchName}</li>
              <li className="list-group-item">Session: {paper.session}</li>
              <li className="list-group-item">Subject: {paper.subject}</li>
              <li className="list-group-item">Year & Sem: {paper.yearWithSem}</li>
            </ul>
            <Link
              to={`/view-paper/${paper.id}`}
              className="btn btn-success shadow mt-3"
            >
              View Paper
            </Link>
          </div>
      </Container>
      <Footer/>
    </>
  );
};

export default ViewPaperDetails;
