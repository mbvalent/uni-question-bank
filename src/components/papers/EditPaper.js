import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useHistory, useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { toast, ToastContainer } from "react-toastify";
import { Form } from "react-bootstrap";

const sessions = ['2020-21', '2019-20', '2018-19', '2017-18', '2016-17', '2015-16'];

const EditPaper = () => {
  let history = useHistory();
  const [branchName, setBranchName] = useState('');
  const [yearWithSem, setYearWithSem] = useState('')
  const [subject, setSubject] = useState('');
  const [session, setSession] = useState('');
  const [subjectsOption, setSubjectsOption] = useState([]);
  const { id } = useParams();
  
  useEffect(() => {
    getSub()
  }, [branchName, yearWithSem])

  const toastMessage = (msg) => {
    toast.success(
      msg,
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
  }

  const handleYearChange = (yearWithSem) => {
    console.log('handleYearChange', yearWithSem)
    let y = yearWithSem === "0" ?  parseInt(yearWithSem) : yearWithSem;
    setYearWithSem(y);
    console.log('subjectOptions', subjectsOption)
  }

  const handleBranchChange = (branch) => {
    console.log('handleBranchChange', branch);
    console.log('subjectOptions', subjectsOption)
    let b = branch === "0" ?  parseInt(branch) : branch;
    setBranchName(b);
  }

  const getSub = () => {
    console.log('getsub')
    
    if(yearWithSem && branchName){
      console.log('both r set!')
      console.log('branchName ', branchName )
      console.log('year: ' , yearWithSem)
      let y = semMapping(yearWithSem);
      axios.get(`/branches/${branchName}/${y}`).then((res) => {
        console.log(res.data);
        if(res.data){
          setSubjectsOption(res.data);
          console.log('subjectsOption', res.data);
        }
      }).catch((err) => {
        console.error(err);
        toastMessage(err.message);
      });
    }
  }

  const semMapping = (yearWithSem) => {
    let y;
    switch (yearWithSem) {
      case '1st Year (1st sem)':
        y = 11;
        break;
      case '1st Year (2nd sem)':
        y = 12;
        break;
      case '2nd Year (1st sem)':
        y = 21;
        break;
      case '2nd Year (2nd sem)':
        y = 22;
        break;
      case '3rd Year (1st sem)':
        y = 31;
        break;
      case '3rd Year (2nd sem)':
        y = 32;
        break;
      case '4th Year (1st sem)':
        y = 41;
        break;
      case '4th Year (2nd sem)':
        y = 42;
        break;
      default:
        break;
    }
    return y;
  }

  const onSubmit = async e => {
    e.preventDefault();
    let paper = {
      branchName: branchName,
      session: session,
      subject: subject,
      yearWithSem: yearWithSem,
    }
    try {
      const result = await axios.patch(`/papers/${id}`, paper);
      console.log('edit result: ', result.data);
      toastMessage('Success!');
    } catch (error) {
      console.error(error.message);
      toastMessage('Error!')
    }
    setTimeout(()=>{
      history.push("/admin-dashboard");
    }, 1500)
  };

  return (
    <div>
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
      <Header/>
      <div style={{
          marginTop: "160px",
          marginBottom: "100px",
          minHeight: "100vh",
        }} className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Edit Paper</h2>
          <form onSubmit={e => onSubmit(e)} enctype="multipart/form-data">
            <div className="form-group">
              <label className="mt-2 form-label">
                Branch*
              </label>
              <select onChange={(e) => handleBranchChange(e.target.value)} value={branchName} name="branchName" className="form-control form-control-lg">
                <option value="0">
                  ---
                </option>
                <option value="cse">Computer Science & Engineering</option>
                <option value="ec">Electronics & Communication Engineering</option>
              </select>
            </div>
            <div className="form-group">
              <label className="mt-2 form-label">
                Year*
              </label>
              <select name="yearWithSem" value={yearWithSem} onChange={(e) => handleYearChange(e.target.value)} className="form-control form-control-lg">
                <option value="0">
                  ---
                </option>
                <option value="1st Year (1st sem)">1st Year (1st sem)</option>
                <option value="1st Year (2nd sem)">1st Year (2nd sem)</option>
                <option value="2nd Year (1st sem)">2nd Year (1st sem)</option>
                <option value="2nd Year (2nd sem)">2nd Year (2nd sem)</option>
                <option value="3rd Year (1st sem)">3rd Year (1st sem)</option>
                <option value="3rd Year (2nd sem)">3rd Year (2nd sem)</option>
                <option value="4th Year (1st sem)">4th Year (1st sem)</option>
                <option value="4th Year (2nd sem)">4th Year (2nd sem)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="mt-2 form-label">
                Subject*
              </label>
              <select name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="form-control form-control-lg">
                <option value="0" >
                  ---
                </option>
                {
                  subjectsOption.map((e, i)=><option key={e._id} value={e.name} >{e.name} - {e.code}</option>)
                }
              </select>
            </div>
            <div className="form-group">
              <label className="mt-2 form-label">
                Session*
              </label>
              <select name="session" value={session} onChange={e => setSession(e.target.value)} className="form-control form-control-lg">
                <option value="0" >
                  ---
                </option>
                {sessions.map((session, index) => (<option value={session} key={session}>{session}</option>))}
              </select>
            </div>
            {/* <div className="form-group">
              <label className="mt-2 form-label">File(PDF)*</label>
              <input type="file" name="pdf" accept="application/pdf" onChange={e => onPdfChange(e)} className="form-control-file" id="exampleFormControlFile1"/>
            </div> */}
            <button type="submit" className="btn btn-primary btn-block">Edit Paper</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
};

export default EditPaper;
