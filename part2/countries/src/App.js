import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import Countries from "./Countries";

function App() {
  const [countries, setCountries] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const countriesToShow = countries?.filter(country =>
    country?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data));
  }, []);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleClick = country => {
    setSearchTerm(country);
  };

  return (
    <div>
      <h1>Countries</h1>
      <Search handleChange={handleChange} searchTerm={searchTerm} />
      {searchTerm !== "" ? (
        <Countries
          countries={countriesToShow}
          handleClick={handleClick}
          searchTerm={searchTerm}
        />
      ) : null}
    </div>
  );
}

export default App;
