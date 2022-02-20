import { createContext, useState, useEffect } from "react";

export const MoviesContext = createContext();

const MoviesProvider = ({ getMovies, addMovie, children }) => {
  const [status, setStatus] = useState("LOADING");
  const [movies, setMovies] = useState([]);

  const refreshMovies = () => {
    if (!getMovies) return;

    setStatus("LOADING");
    getMovies()
      .then((movies) => {
        setStatus("SUCCESS");
        setMovies(movies);
      })
      .catch(() => setStatus("ERROR"));
  };

  useEffect(() => {
    refreshMovies();
  }, [getMovies]);

  const addMovieWithRefresh = async ({ name }) => {
    await addMovie({ name });

    refreshMovies();
  };

  return (
    <MoviesContext.Provider value={{ addMovie: addMovieWithRefresh, status, movies }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
