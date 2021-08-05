import axios from 'axios';
import React from 'react';
import { Link } from "react-router-dom";


export default function Datatable({ data }) {
  // const columns = data[0] && Object.keys(data[0]);
  return (
    // <table cellPadding={0} cellSpacing={0}>
    //   <thead>
    //     <tr>
    //       {data[0] && columns.map((heading) => <th>{heading}</th>)}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data.map((row) => (
    //       <tr>
    //         {columns.map((column) => (
    //           <td>{row[column]}</td>
    //         ))}
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    <>
      <div style={{"overflow-x":"auto"}}>
        <table className="mb-5  table table-hover border shadow">
          <thead className="text-center thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Branch Name</th>
              <th scope="col">Year & Sem</th>
              <th scope="col">Subject</th>
              <th scope="col">Session</th>
              <th scope="col">Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((paper, index) => (
              <tr key={paper._id}>
                <th scope="row">{index + 1}</th>
                <td>{paper.branchName}</td>
                <td>{paper.yearWithSem}</td>
                <td>{paper.subject}</td>
                <td>{paper.session}</td>
                <td>{paper.createdAt}</td>
                <td>
                  <Link className="btn btn-primary m-1" to={`/papers/${paper._id}`}>
                    View
                  </Link>
                  <a className="btn btn-success m-1" target="_blank" href={`http://localhost:9000/uploads/${paper.pdf}`} download="paper.pdf">
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
