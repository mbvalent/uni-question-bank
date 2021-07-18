import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

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
    const res = await axios.get(`/papers/${id}`);
    console.log('view paper: ', res.data)
    let data = res.data;
    let text = 'uploads\\';
    let linkStart = data.pdf.indexOf(text) + text.length;
    let link = data.pdf.substr(linkStart, data.pdf.length);
    data.pdf = link;
    // date string
    let date = new Date(data.createdAt);
    data.createdAt = date.toDateString();
    setPaper(data);
  };
  let history = useHistory();
  return (
    <>
      <Header/>
      <Container
        style={{ marginTop:"100px", minHeight: "100vh" }}
      >
          <div className="container w-100 py-4">
            <button className="btn btn-primary mb-5" onClick={() => history.goBack()}>
              <i class="fas fa-arrow-left"></i> back
            </button>
            <h1 className="display-4">{paper.subject}</h1>
            <hr />
            <ul className="list-group w-50">
              <li className="list-group-item">Branch Name: {paper.branchName}</li>
              <li className="list-group-item">Session: {paper.session}</li>
              <li className="list-group-item">Subject: {paper.subject}</li>
              <li className="list-group-item">Year & Sem: {paper.yearWithSem}</li>
              <li className="list-group-item">Created Date: {paper.createdAt}</li>
            </ul>
            <Link
              to={`/view-paper/${paper.pdf}`}
              className="btn btn-success shadow mt-3"
            >
              View PDF
            </Link>
          </div>
      </Container>
      <Footer/>
    </>
  );
};

export default ViewPaperDetails;
