import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Alert, Card, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import PaperSearchResult from "./PaperSearchResult";
import { ToastContainer, toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";

const sessions = ['2020-21', '2019-20', '2018-19', '2017-18', '2016-17', '2015-16'];

const Home = () => {
  let history = useHistory();
  const [error, setError] = useState("");
  const [subjectsOption, setSubjectsOption] = useState([]);
  const [branchName, setBranchName] = useState('');
  const [yearWithSem, setYearWithSem] = useState('')
  const [subject, setSubject] = useState('');
  const [session, setSession] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNullOption, setShowNullOption] = useState(true)
  const [queryData, setQueryData] = useState([])

  useEffect(() => {
    getSub()
  }, [branchName, yearWithSem])

  const handleBranchChange = (branch) => {
    setBranchName(branch);
    setShowNullOption(false);
  }

  const handlePaperSearch = () => {
    setShowSearchResults(true);
  }

  const isValid = () => {
    if(!branchName){
      return false;
    }
    return true;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if(!isValid()) {
      toast.success(
        'Fill all required fields!',
      {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const qSchema = {
      branchName: branchName,
      session: session,
      subject: subject,
      yearWithSem: yearWithSem
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(qSchema)
    };
    fetch('/query', requestOptions)
    .then(async response => {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson && await response.json();

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      console.log('mydata:) ', data)
      if(!data){
        toast.success(
        'No Records Found!',
          {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        return;
      }
      setQueryData(data);
      setShowSearchResults(true)
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
  };

  const handleYearChange = (yearWithSem) => {
    setYearWithSem(yearWithSem);
    console.log(yearWithSem);
    setShowNullOption(false);
  }

  const getSub = () => {
    console.log('getSub ', yearWithSem)
    if(yearWithSem && branchName){
      axios.get(`/branches/${branchName}/${yearWithSem}`).then((res) => {
        console.log(res.data);
        if(res.data){
          if(res.data.length){
            setSubjectsOption(res.data);
          }
        }
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
    }
  }

  if(showSearchResults){
    return (<PaperSearchResult queryData={queryData}/>)
  }else{
    return (
      <>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{
          marginTop: "13rem",
          marginBottom: "100px",
          minHeight: "100vh",
        }}
        >
        <div
          style={{ minHeight: "100vh", maxWidth: "500px" }}
          className="w-100"
          >
            <div className="d-flex align-items-center justify-content-center">
              <Link className="btn btn-lg btn-link mb-5" to="/search-all">
                  Search all papers 
              </Link>
            </div>
            {/* <a >
              
            </a> */}
          <Card className="shadow bg-light">
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <form id="rest-form" onSubmit={(e)=> handleSubmit(e)} >
                <div className="form-outline mb-2">
                  <select onChange={(e) => handleBranchChange(e.target.value)} value={branchName} className="form-control">
                    {showNullOption && (<option value="0" >
                      ---
                    </option>)}
                    <option value="cse">Computer Science & Engineering</option>
                    <option value="ec">Electronics & Communication Engineering</option>
                  </select>
                  <label className="mt-2 form-label">
                    Branch*
                  </label>
                </div>
                <div className="form-outline mb-2">
                  <select name="year" onChange={(e) => handleYearChange(e.target.value)} value={yearWithSem} id="year" className="form-control">
                    <option value="0" >
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
                    Year
                  </label>
                </div>
                <div className="form-outline mb-2">
                  <select onChange={(e) => setSubject(e.target.value)} name="subjectsOption" id="subjectsOption" className="form-control">
                    <option value="0" >
                      ---
                    </option>
                    {subjectsOption && subjectsOption.map((sub, index) => (<option value={sub.name} key={ sub._id }>{sub.name}</option>))}
                  </select>
                  <label className="mt-2 form-label" for="form6Example3">
                    Subject
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
                    Session
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-2"
                  >
                  Search Paper <i className="fas fa-search"></i>
                </button>
              </form>
            </Card.Body>
          </Card>
        </div>
      </Container>
      <Footer />
    </>)
  }
};

export default Home;
