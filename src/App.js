import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import AddMovieForm from "./Components/AddMovieForm";
import MovieList from "./Components/MovieList";
import MoviesProvider from "./Contexts/MoviesProvider";

function App() {
  return (
    <MoviesProvider
      addMovie={async ({ name }) => {
        await fetch("/movies/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
      }}
      getMovies={async () => {
        const res = await fetch("/movies/");
        return await res.json();
      }}
    >
      <AddMovieForm />
      <MovieList />
    </MoviesProvider>
  );
}

export default App;
