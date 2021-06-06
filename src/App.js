import "./App.css";
import Rows from "./components/Rows/Rows";
import requests from "./services/request";
import Banner from "./components/Banner/Banner";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <div className="app">
      <Nav />
      {/* Banner */}
      <Banner />
      <Rows
        title="NETFLIX Original"
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Rows title="Trending Now" fetchURL={requests.fetchTrending} />
      <Rows title="Top Rated" fetchURL={requests.fetchTopRated} />
      {/* <Rows title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Rows title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Rows title="Horror movies" fetchURL={requests.fetchHorrorMovies} />
      <Rows title="Romanc Movies" fetchURL={requests.fetchRomanceMovies} />
      <Rows title="Documentaries" fetchURL={requests.fetchDocumentaries} /> */}
    </div>
  );
}

export default App;
