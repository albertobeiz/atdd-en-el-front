import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import AddMovieForm from "./Components/AddMovieForm";
import MovieList from "./Components/MovieList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshMovies = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 50);
  };

  useEffect(() => {
    refreshMovies();
  }, []);

  return (
    <div>
      <AddMovieForm
        onSubmit={async ({ name }) => {
          await fetch("/movies/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
          });
          refreshMovies();
        }}
      />

      <MovieList
        getMovies={async () => {
          const res = await fetch("/movies/");
          return await res.json();
        }}
        refresh={refresh}
      ></MovieList>
    </div>
  );
}

export default App;
