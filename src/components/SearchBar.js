import React, { useState } from "react";

const SearchBar = () => {

  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query)
    // this.props.setQuery(this.seachQuery);
  };
  return (
    <div className="">
      <div className="container">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <form className="navbar-form" onSubmit={handleSubmit}>
                <div className="input-group input-group-lg">
                  <input
                    className="form-control  shadow p-4 mb-5 bg-white "
                    style={{ borderRadius: "2rem" }}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    value={query}
                    name="search"
                    placeholder="Search For Documents"
                  />
                  <span className="input-group-btn">
                    <button
                      type="submit"
                      className="ml-3 btn shadow  "
                      style={{
                        borderRadius: "2rem",
                        padding: "14px",
                        backgroundColor: "#D3D3D3",
                      }}
                    >
                      Search <i class="faSearch"></i>
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchBar;