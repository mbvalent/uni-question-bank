// import React from "react";
// import { Link } from "react-router-dom";
// import Footer from "./Footer";
// import Header from "./Header";
// import { Container } from "react-bootstrap";

// const AddEvent = () => {
//   return (
//     <div>
//       <Header />
//       <Container
//         className="d-flex align-items-center justify-content-center"
//         style={{
//           marginTop: "5px",
//           marginBottom: "100px",
//           minHeight: "100vh",
//         }}
//       >
//         <div className="w-100" style={{ maxWidth: "500px" }}>
//           <Link className="mb-2 btn btn-lg btn-light" to="/home">
//             <i className="far fa-hand-point-left"></i> Back to Events
//           </Link>
//           <h1>ADMIN DASHBOARD</h1>
//         </div>
//       </Container>
//       <Footer />
//     </div>
//   );
// };

// export default AddEvent;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AdminDashboard = () => {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/papers");
    setPapers(result.data.reverse());
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3003/papers/${id}`);
    loadUsers();
  };

  return (
    <div>
      <div className="mt-5 container">
        <Header/>
        <div className="py-4">
          <h1 className="mt-5 mb-4 text-center display-4">
            Admin Dashboard
          </h1>
          <div className="d-flex justify-content-center">
            <Link className="btn btn-lg rounded btn-success  mb-4" to="/papers/add">Add paper</Link>
          </div>
          <table class="mb-5 table-responsive table table-hover border shadow">
            <thead class="text-center thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Banch Name</th>
                <th scope="col">Year & Sem</th>
                <th scope="col">Subject</th>
                <th scope="col">Session</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{paper.branchName}</td>
                  <td>{paper.yearWithSem}</td>
                  <td>{paper.subject}</td>
                  <td>{paper.session}</td>
                  <td>
                    <Link class="btn btn-primary mr-2" to={`/papers/${paper.id}`}>
                      View
                    </Link>
                    <Link class="btn btn-success mr-2" to={`/papers/${paper.id}`}>
                      Download
                    </Link>
                    <Link
                      class="btn btn-outline-primary mr-2"
                      to={`/papers/edit/${paper.id}`}
                      >
                      Edit
                    </Link>
                    <Link
                      class="btn btn-danger mt-3"
                      onClick={() => deleteUser(paper.id)}
                      >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminDashboard;
