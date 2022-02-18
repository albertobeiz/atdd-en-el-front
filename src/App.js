import "./App.css";
import AddMovieForm from "./Components/AddMovieForm";
import MovieList from "./Components/MovieList";

function App() {
  return (
    <div>
      <AddMovieForm
        onSubmit={({ name }) =>
          fetch("/movies/", { method: "POST", body: JSON.stringify({ name }) })
        }
      />

      <MovieList
        getMovies={async () => {
          const res = await fetch("/movies/");
          return await res.json();
        }}
        refresh={true}
      ></MovieList>
    </div>
  );
}

export default App;
