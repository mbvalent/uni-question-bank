import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Header from "./Header";
import { Spinner } from "react-bootstrap";
import Footer from "./Footer";
import axios from "axios";
import Paper from "./Paper";

// import events from './sampleEvents'

const PaperSearchResult = ({queryData}) => {
  const [papers, setPapers] = useState([{
    id: 123,
    branchName: 'Computer Science & Engineering',
    session: '2020-21',
    subject: 'Computer Architecture',
    yearWithSem: '1st Year (1st Sem)'
  },{
    id: 124,
    branchName: 'Electronics & Communication Engineering',
    session: '2020-21',
    subject: 'Computer Architecture',
    yearWithSem: '1st Year (1st Sem)'
  }]);
  const [loading, setLoading] = useState(false);

  //REALTIME Read FUNCTION
  // function getPapers(queryData) {
  //   setLoading(true);
  //   axios.post('/paperSearch', queryData)
  //   .then((response) => {
  //     setLoading(false);
  //     setPapers(response.data);
  //     console.log(response.data);
  //   }).catch((error) => {
  //     setLoading(false);
  //     console.log(error);
  //   });
  // }

  // useEffect(() => {
  //   getPapers(queryData);
  //   // eslint-disable-next-line
  // }, []);

  return loading ? (
    <div className="text-center spinner">
      <Spinner animation="border" role="status" />
    </div>
  ) : (
    <div >
      <Header />

      <h1
        style={{ marginTop: "100px" }}
        className="text-info text-center display-4"
      >
        Search Results
      </h1>

      <Row>
        {papers.map((paper) => (
          <Col key={paper.id} sm={12} md={6} lg={4} xl={3}>
            <Paper paper={paper} />
          </Col>
        ))}
      </Row>
      <Footer />
    </div>
  );
};

export default PaperSearchResult;
