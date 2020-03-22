import React from "react";

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <label htmlFor="search">search contact: </label>
      <input
        type="search"
        name="search"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Filter;
