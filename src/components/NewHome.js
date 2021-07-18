import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Datatable from './datatable';
import './NewHome.css';
import Header from './Header';

export default function NewHome() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState([
    'branchName',
    'session',
    'subject',
    'yearWithSem',
  ]);

  useEffect(() => {
    loadUsers();
  }, []);

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
    setData(data.reverse());
  };

  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) => {
          if(row[column]){
            return row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          }
        }
          
      ),
    );
  }

  const columns = [' Branch Name', ' Session', ' Subject', ' Year & Sem']
  return (
    <div>
      <Header/>
      <div style={{marginTop: "6rem", marginLeft: "5rem", marginRight: "5rem"}} className="">
        <div className="m-3 d-flex align-items-center justify-content-center">
          <input
            className="h-100 shadow-sm p-3 mb-5 bg-white rounded w-50 form-control rounded-pill"
            type='text'
            value={q}
            placeholder="Search..."
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <p class="font-weight-light">Search By:</p>
        <hr/>
        <div className="mx-5 d-flex align-items-center justify-content-between">
          {columns &&
            columns.map((column) => (
              <label className="mb-0" key={column}>
                <input
                  className=""
                  type='checkbox'
                  checked={searchColumns.includes(column)}
                  onChange={(e) => {
                    const checked = searchColumns.includes(column);
                    setSearchColumns((prev) =>
                      checked
                        ? prev.filter((sc) => sc !== column)
                        : [...prev, column],
                    );
                  }}
                />
                {column}
              </label>
            ))}
        </div>
        <hr/>

        
        <div className="mt-5">
          <Datatable data={search(data)} />
        </div>
      </div>
    </div>
  );
}