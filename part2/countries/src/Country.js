import React, { useEffect, useState } from "react";
import axios from "axios";
require("dotenv").config();

const Country = ({
  searchTerm,
  handleClick,
  showFullInfo,
  country: { name, capital, population, area, languages, flag }
}) => {
  const [weather, setWeather] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;
  const baseUrl = "http://api.weatherstack.com";

  useEffect(() => {
    if (showFullInfo)
      axios
        .get(`${baseUrl}/current?access_key=${api_key}&query=${name}`)
        .then(response => setWeather(response.data.current));
  }, [name, api_key, showFullInfo]);

  const highlightSearchText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map(part =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={highlight} style={{ background: "yellow" }}>
              {part}
            </b>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const numberWithCommas = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (showFullInfo) {
    return (
      <div>
        <h2>{name}</h2>
        <p>Capital: {capital}</p>
        <p>
          Area: {numberWithCommas(area)} km<sup>2</sup>
        </p>
        <p>Population: {numberWithCommas(population)}</p>
        <p>Languagues:</p>
        <ul>
          {languages.map(language => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <div>
          <img
            src={flag}
            alt={`${name} flag`}
            style={{ maxWidth: "250px", width: "100%" }}
          />
        </div>
        <h3>Weather in {capital}</h3>
        <p>Temperature: {weather?.temperature} Celsius</p>
        <img
          src={weather?.weather_icons[0]}
          style={{ maxWidth: "50px", width: "100%" }}
          alt="Weather icon"
        />
        <p>
          Wind: {weather?.wind_speed} mph direction {weather?.wind_dir}
        </p>
      </div>
    );
  }
  return (
    <div>
      <span>{highlightSearchText(name, searchTerm)}</span>{" "}
      <button onClick={() => handleClick(name)}>show</button>
    </div>
  );
};

export default Country;
