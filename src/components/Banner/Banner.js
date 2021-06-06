import axios from "../../services/axios";
import React, { useState, useEffect } from "react";
import requests from "../../services/request";
import "./Banner.css";

function Banner() {
  const imageOriginalBaseURL = "https://image.tmdb.org/t/p/original/";
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const dataIndex = Math.floor(
        Math.random() * request.data.results.length - 1
      );
      console.log(request.data.results[dataIndex]);
      setMovie(request.data.results[dataIndex]);
    }
    fetchData();
    return () => {
      // cleanup;
    };
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${imageOriginalBaseURL}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h1 className="banner_description">{movie?.overview}</h1>
        <div className="banner_fadeBottom"></div>
      </div>
    </header>
  );
}

export default Banner;
