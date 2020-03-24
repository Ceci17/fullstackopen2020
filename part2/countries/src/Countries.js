import React from "react";
import Country from "./Country";
require("dotenv").config();

const Countries = ({ countries, handleClick, searchTerm }) => {
  return (
    <div>
      {countries.length < 10 ? (
        countries?.map(country => (
          <Country
            searchTerm={searchTerm}
            handleClick={handleClick}
            key={country.name}
            country={country}
            showFullInfo={countries.length === 1}
          />
        ))
      ) : (
        <p>Be more specific</p>
      )}
    </div>
  );
};

export default Countries;
