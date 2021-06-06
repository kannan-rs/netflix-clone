import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "../../services/axios";
import "./Row.css";

function Rows({ title, fetchURL, isLargeRow }) {
  const imageOriginalBaseURL = "https://image.tmdb.org/t/p/original/";

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    // Call when
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
    }
    fetchData();

    return () => {
      // Destroy
    };
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovieImgClick = (movie) => {
    console.log(movie);
    setTrailerUrl("");
    movieTrailer(movie?.name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).searchParams);
        const youTubeID = urlParams.get("v");
        setTrailerUrl(youTubeID);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      {
        //JSON.stringify(movies)
      }

      {movies.length ? (
        <React.Fragment>
          <div className="row_posters">
            {movies.length &&
              movies.map((movie) => (
                <img
                  className={`row_poster_image ${
                    isLargeRow && "row_poster_image_large"
                  }`}
                  src={`${imageOriginalBaseURL}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  key={movie.id}
                  alt={movie.name}
                  onClick={() => handleMovieImgClick(movie)}
                />
              ))}
          </div>
        </React.Fragment>
      ) : null}

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Rows;
