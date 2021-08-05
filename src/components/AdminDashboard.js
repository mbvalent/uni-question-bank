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
import './AdminDashboard.css'
import { Dropdown, DropdownButton, Pagination } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const AdminDashboard = () => {
  const [papers, setPapers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [orgtableData, setOrgtableData] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  
  useEffect(() => {
    loadMoreData();
  }, [currentPage, offset])

  // --------pagination--------------
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setOffset(offset);
    setCurrentPage(selectedPage);
    // loadMoreData();
    window.scrollTo(0, 0);
  };


  const loadMoreData = () => {
    const data = orgtableData;
    const slice = data.slice(
      offset,
      offset + perPage
    );
    setPageCount(Math.ceil(data.length / perPage));
    setTableData(slice)
  }
  // --------pagination end--------------
  const loadUsers = async () => {
    const result = await axios.get("/papers");
    console.log('result: ', result.data);
    let data = result.data;
    data.forEach(function(d){
      let text = 'uploads\\';
      let linkStart = d.pdf.indexOf(text) + text.length;
      let link = d.pdf.substr(linkStart, d.pdf.length);
      d.pdf = link;
      // date string
      let date = new Date(d.createdAt);
      d.createdAt = date.toDateString();
    });
    setPapers(data.reverse());
    paginationAfterLoad(data.reverse()); // pagination
  };

  const paginationAfterLoad = (data) => {
    const data2 = data;
    const slice = data2.slice(
      offset,
      offset + perPage
    );
    setPageCount(Math.ceil(data2.length / perPage));
    setOrgtableData(data);
    setTableData(slice);
  }

  const deleteUser = async id => {
    await axios.delete(`/papers/${id}`);
    loadUsers();
  };

  const onPerPageChange = (e) => {
    setPerPage(e.target.value);
  }

  return (
    <div>
      <div style={{ minHeight: "87vh" }} className="mt-5 container">
        <Header/>
        <div className="py-4">
          <h1 className="mt-5 mb-4 text-center display-4">
            Admin Dashboard
          </h1>
          <div className="d-flex justify-content-center">
            <Link className="btn btn-lg rounded btn-success  mb-4" to="/papers/add">Add paper</Link>
          </div>
          {/* pagination */}
          <div className="row justify-content-center">
            <div className="col-xs-12">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={(e) => handlePageClick(e)}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
          {/* pagination end */}
          {/* <div className="float-right m-2">
            <label id="perPage">
              per page:
            </label>
            <select disabled onChange={e => onPerPageChange(e)} value={perPage} name="perPage" className="form-control form-control-lg">
              {[...Array(10)].map((e, i) => <option value={i+1} key={ i }>{i+1}</option>)}
            </select>
          </div> */}
          <div style={{"overflow-x":"auto"}}>
            <table className="mb-5  table table-hover border shadow">
              <thead className="text-center thead-dark">
                <tr>
                  {/* <th scope="col">#</th> */}
                  <th scope="col">Branch Name</th>
                  <th scope="col">Year & Sem</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Session</th>
                  <th scope="col">Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((paper, index) => (
                  <tr key={paper._id}>
                    {/* <th className="align-middle" scope="row">{index + 1}</th> */}
                    <td className="align-middle">{paper.branchName}</td>
                    <td className="align-middle">{paper.yearWithSem}</td>
                    <td className="align-middle">{paper.subject}</td>
                    <td className="align-middle">{paper.session}</td>
                    <td className="align-middle">{paper.createdAt}</td>
                    <td>
                      <Link className="btn btn-primary m-1" to={`/papers/${paper._id}`}>
                        View
                      </Link>
                      <a className="btn btn-success m-1" target="_blank" href={`http://localhost:9000/uploads/${paper.pdf}`} download="paper.pdf">
                        Download
                      </a>
                      <Link className="btn btn-outline-primary m-1" to={`/papers/edit/${paper._id}`}>
                        Edit
                      </Link>
                      <button className="btn btn-danger m-1" onClick={() => deleteUser(paper._id)}>
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminDashboard;
