import React from "react";
import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import pdfFile from '../pdf/sample.pdf';


const Paper = ({ paper }) => {

  const handlePdfClick = (e) => {
    e.preventDefault();
    window.location.href = "http://www.africau.edu/images/default/sample.pdf"
    // let fileURL = "http://www.africau.edu/images/default/sample.pdf"
    // fetch('https://cors-anywhere.herokuapp.com/' + fileURL, {
    // method: 'GET',
    // // headers: {
    // //   'Content-Type': 'application/pdf',
    // // },
    // })
    // .then((response) => response.blob())
    // .then((blob) => {
    //   // Create blob link to download
    //   const url = window.URL.createObjectURL(
    //     new Blob([blob]),
    //   );
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute(
    //     'download',
    //     `sample.pdf`,
    //   );

    //   // Append to html link element page
    //   document.body.appendChild(link);

    //   // Start download
    //   link.click();

    //   // Clean up and remove the link
    //   link.parentNode.removeChild(link);
    // });
  };



  return (
    <div>
      <Container>
        <Card className="my-3 p-3 border-0 rounded shadow p-3 mb-5 bg-light rounded">
          <Link to={`/view-paper/${paper.id}`}>
            <Card.Img  variant="top" src='https://store-images.s-microsoft.com/image/apps.34961.13510798887621962.47b62c4c-a0c6-4e3c-87bb-509317d9c364.a6354b48-c68a-47fa-b69e-4cb592d42ffc?mode=scale&q=90&h=300&w=300' />
          </Link>
          <hr />
          <Card.Body>
            <Card.Text as="div">{paper.branchName}</Card.Text>
            <Card.Text className="mt-3" as="h3">
              {paper.session}
            </Card.Text>
            <Card.Text className="mt-3" as="h3">
              {paper.subject}
            </Card.Text>
            <Card.Text className="mt-3" as="h3">
              {paper.yearWithSem}
            </Card.Text>
            <hr />
            <Link
              to={`/view-paper/${paper.id}`}
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
};

export default Paper;
