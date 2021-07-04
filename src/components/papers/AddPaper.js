import React, { useState } from "react";
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
  });
  const [subjectsOption, setSubjectsOption] = useState(['a', 'b', 'c']);

  const { branchName, session, yearWithSem, subject } = paper;
  const onInputChange = e => {
    setPaper({ ...paper, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:3003/papers", paper);
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
          <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <label className="mt-2 form-label">
                Branch*
              </label>
              <select onChange={e => onInputChange(e)} value={branchName} name="branchName" className="form-control form-control-lg">
                <option value="null" >
                  ---
                </option>
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
            <button className="btn btn-primary btn-block">Add Paper</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
};

export default AddPaper;
