import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Container, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Paper = ({ paper }) => {
  const [newPaper, setNewPaper] = useState('');
  const [error, setError] = useState('');
  
  const history = useHistory();


  const handlePdfClick = (e) => {
    e.preventDefault();
    history.push(`/view-paper/${paper.pdf}`);
    // window.location.href = "http://www.africau.edu/images/default/sample.pdf"
  };

  useEffect(() => {
    console.log('paper', paper)
    let data = paper;
    let text = 'uploads\\';
    if(data && data.pdf){
      let linkStart = data.pdf.indexOf(text) + text.length;
      let link = data.pdf.substr(linkStart, data.pdf.length);
      data.pdf = link;
      // date string
      let date = new Date(data.createdAt);
      data.createdAt = date.toDateString();
      console.log('data', data);
      setNewPaper(data);
    } else {
      console.error('No records found!aswwww ')
    }
  }, [])

  if(error){
    return (
      <div style={{ minHeight: "100vh" }}>
        <Container  className="d-flex align-items-center justify-content-center">
          {error && (<Alert variant="danger">{error}</Alert>)}
        </Container>
      </div>
    )
  } else{
    return (
      <div>
        <Container style={{ minHeight: "100vh" }}>
          <Card className="my-3 p-3 border-0 rounded shadow p-3 mb-5 bg-light rounded">
            <Link to={`/view-paper/${newPaper.id}`}>
              <Card.Img  variant="top" src='https://store-images.s-microsoft.com/image/apps.34961.13510798887621962.47b62c4c-a0c6-4e3c-87bb-509317d9c364.a6354b48-c68a-47fa-b69e-4cb592d42ffc?mode=scale&q=90&h=300&w=300' />
            </Link>
            <hr />
            <Card.Body>
              <Card.Text as="div">{newPaper.branchName}</Card.Text>
              <Card.Text className="mt-3" as="h3">
                {newPaper.session}
              </Card.Text>
              <Card.Text className="mt-3" as="h3">
                {newPaper.subject}
              </Card.Text>
              <Card.Text className="mt-3" as="h3">
                {newPaper.yearWithSem}
              </Card.Text>
              <hr />
              <Link
                to={`/view-paper/${newPaper.pdf}`}
                className="btn btn-success shadow mt-3"
              >
                View Paper
              </Link>
              {/* <Link
                to="http://google.com"
                className="btn btn-secondary float-right shadow mt-3"
              > */}
              <button className="btn btn-secondary float-right shadow mt-3" onClick={(e)=>handlePdfClick(e)}>

                Download <i className="fas fa-file-download"></i>
              </button>
              {/* </Link> */}
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
};

export default Paper;
