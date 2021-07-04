import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Alert, Card, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { fn } from "jquery";
import PaperSearchResult from "./PaperSearchResult";

const sessions = ['2020-21', '2019-20', '2018-19', '2017-18', '2016-17', '2015-16'];

const Home = () => {
  const [error, setError] = useState("");
  const [subjectsOption, setSubjectsOption] = useState(['a', 'b', 'c']);
  const [branchName, setBranchName] = useState('');
  const [yearWithSem, setYearWithSem] = useState('')
  const [subject, setSubject] = useState('');
  const [session, setSession] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleBranchChange = (branch) => {
    setBranchName(branch);
    console.log(branch)
  }

  const handlePaperSearch = () => {
    setShowSearchResults(true);
  }


  // useEffect(() => {
    
  // }, []);

  const handleYearChange = (yearWithSem) => {
    setYearWithSem(yearWithSem);
    console.log(yearWithSem)
    // axios
    //   .get("https://dummyapi.io/data/api/user?limit=10")
    //   .then((res) => {
    //     console.log(res.data);
    //     // setSubjectsOption(res.data);
    //     // console.log("subjectsOption "+JSON.stringify(subjectsOption));
    //   })
    //   .catch((err) => {
    //     setError(err);
    //     console.log(err);
    //   });
  }

  
  
  if(showSearchResults) {
    return <PaperSearchResult queryData={{
      branch: branchName,
      yearWithSem: yearWithSem,
      subject: subject,
      session: session, 
    }} />
  } else {
    return (
      <>
      <Header />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{
          marginTop: "160px",
          marginBottom: "100px",
          minHeight: "100vh",
        }}
        >
        <div
          style={{ minHeight: "100vh", maxWidth: "500px" }}
          className="w-100"
          >
          <Card className="shadow bg-light">
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <form id="rest-form">
                <div className="form-outline mb-2">
                  <select onChange={(e) => handleBranchChange(e.target.value)} value={branchName} name="cars" id="cars" className="form-control">
                    <option value="null" >
                      ---
                    </option>
                    <option value="cse">Computer Science & Engineering</option>
                    <option value="ec">Electronics & Communication Engineering</option>
                  </select>
                  <label className="mt-2 form-label" for="form6Example3">
                    Branch*
                  </label>
                </div>
                <div className="form-outline mb-2">
                  <select name="year" onChange={(e) => handleYearChange(e.target.value)} value={yearWithSem} id="year" className="form-control">
                    <option value="null" >
                      ---
                    </option>
                    <option value="11">1st Year (1st sem)</option>
                    <option value="12">1st Year (2nd sem)</option>
                    <option value="21">2nd Year (1st sem)</option>
                    <option value="22">2nd Year (2nd sem)</option>
                    <option value="31">3rd Year (1st sem)</option>
                    <option value="32">3rd Year (2nd sem)</option>
                    <option value="41">4th Year (1st sem)</option>
                    <option value="42">4th Year (2nd sem)</option>
                  </select>
                  <label className="mt-2 form-label" for="form6Example3">
                    Year*
                  </label>
                </div>
                <div className="form-outline mb-2">
                  <select onChange={(e) => setSubject(e.target.value)} defaultValue={null} name="subjectsOption" id="subjectsOption" className="form-control">
                    <option value="null" >
                      ---
                    </option>
                    {subjectsOption.map((subject, index) => (<option value={subject} key={ subject }>{subject}</option>))}
                  </select>
                  <label className="mt-2 form-label" for="form6Example3">
                    Subject*
                  </label>
                </div>
                <div className="form-outline mb-2">
                  <select onChange={(e) => setSession(e.target.value)} name="cars" id="cars" className="form-control">
                    <option value="null" >
                      ---
                    </option>
                    {sessions.map((session, index) => (<option value={session} key={ session }>{session}</option>))}
                  </select>
                  <label className="mt-2 form-label" for="form6Example3">
                    Session*
                  </label>
                </div>
              </form>
              <button
                type="submit"
                className="btn btn-primary btn-block mb-2"
                onClick={handlePaperSearch}
                >
                Search Paper <i className="fas fa-search"></i>
              </button>
            </Card.Body>
          </Card>
        </div>
      </Container>
      <Footer />
    </>
  );}
};

export default Home;
