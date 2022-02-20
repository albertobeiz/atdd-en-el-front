import { useContext } from "react";
import { MoviesContext } from "../Contexts/MoviesProvider";

const MovieList = () => {
  const { status, movies } = useContext(MoviesContext);

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
