import React from "react";

const Search = ({ searchTerm, handleChange }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <input type="search" value={searchTerm} onChange={handleChange} />
    </div>
  );
};

export default Search;
