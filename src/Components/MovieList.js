import { useEffect, useState } from "react";

const MovieList = ({ getMovies, refresh }) => {
  const [status, setStatus] = useState("LOADING");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (refresh) {
      setStatus("LOADING");
      getMovies()
        .then((movies) => {
          setStatus("SUCCESS");
          setMovies(movies);
        })
        .catch(() => setStatus("ERROR"));
    }
  }, [getMovies, refresh]);

  return (
    <div>
      {status === "LOADING" && <p>Cargando películas...</p>}
      {status === "ERROR" && <p>No se pudo cargar la lista</p>}

      {status === "SUCCESS" && (
        <>
          {movies.length === 0 && <p>No hay películas añadidas</p>}
          <ul>
            {movies &&
              movies.map((movie) => (
                <li key={movie.id}>
                  <span>{movie.id}</span> - <span>{movie.name}</span>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieList;
