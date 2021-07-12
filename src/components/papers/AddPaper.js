import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const sessions = ['2020-21', '2019-20', '2018-19', '2017-18', '2016-17', '2015-16'];

const AddPaper = () => {
  let history = useHistory();
  const [paper, setPaper] = useState({
    branchName: "",
    session: "",
    yearWithSem: "",
    subject: "",
    pdf: ""
  });
  const [subjectsOption, setSubjectsOption] = useState([]);
  const [showNullOption, setShowNullOption] = useState(true);


  useEffect(() => {
    getSub()
  }, [paper])

  const getSub = () => {
    console.log('getSub ', yearWithSem)
    if(paper.yearWithSem && paper.branchName){
      axios.get(`/branches/${branchName}/${yearWithSem}`).then((res) => {
        console.log(res.data);
        if(res.data){
          setSubjectsOption(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  const { branchName, session, yearWithSem, subject } = paper;
  const onInputChange = e => {
    if(e.target.name === 'branchName' || e.target.name === 'yearWithSem'){
      setShowNullOption(false);
    }
    if(e.target.files){
      setPaper({...paper, [e.target.name]: e.target.files[0]})
    } else {
      setPaper({ ...paper, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();

    // paper.forEach(,
    // function (input, i) {
    //   // use the input name, don't invent another one
    //   if (input.value) formData.append(input.name, input.files[0]);
    // }

    formData.append('pdf',paper.pdf);
    formData.append('branchName',paper.branchName);
    formData.append('session',paper.session);
    formData.append('subject',paper.subject);
    formData.append('yearWithSem',paper.yearWithSem);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const result = await axios.post("/papers", formData, config);
    console.log('add result: ', result.data)
    history.push("/admin-dashboard");
  };
  return (
    <div >
      <Header/>
      <div style={{
          marginTop: "160px",
          marginBottom: "100px",
          minHeight: "100vh",
        }} className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Add Paper</h2>
          <form onSubmit={e => onSubmit(e)} enctype="multipart/form-data">
            <div className="form-group">
              <label className="mt-2 form-label">
                Branch*
              </label>
              <select onChange={e => onInputChange(e)} value={branchName} name="branchName" className="form-control form-control-lg">
                {showNullOption && (<option value="0" >
                  ---
                </option>)}
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
              </select>
            </div>
            <div className="form-group">
              <label className="mt-2 form-label" for="form6Example3">
                Year*
              </label>
              <select name="yearWithSem" value={yearWithSem} onChange={e => onInputChange(e)} className="form-control form-control-lg">
                <option value="null" >
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
              <label className="mt-2 form-label" for="form6Example3">
                Subject*
              </label>
              <select name="subject" value={subject} onChange={e => onInputChange(e)} className="form-control form-control-lg">
                <option value="null" >
                  ---
                </option>
                {subjectsOption.map((subject, index) => (<option value={subject} key={ subject }>{subject}</option>))}
              </select>
            </div>
            <div className="form-group">
              <label className="mt-2 form-label" for="form6Example3">
                Session*
              </label>
              <select name="session" value={session} onChange={e => onInputChange(e)} className="form-control form-control-lg">
                <option value="null" >
                  ---
                </option>
                {sessions.map((session, index) => (<option value={session} key={ session }>{session}</option>))}
              </select>
            </div>
            <div className="form-group">
              <label for="exampleFormControlFile1">PDF*</label>
              {/* accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" */}
              <input type="file" name="pdf" accept="application/pdf" onChange={e => onInputChange(e)} className="form-control-file" id="exampleFormControlFile1"/>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Add Paper</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
};

export default AddPaper;
