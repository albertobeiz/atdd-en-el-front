import "./App.css";
import AddMovieForm from "./Components/AddMovieForm";

function App() {
  return (
    <div>
      <AddMovieForm
        onSubmit={({ name }) =>
          fetch("/movies/", { method: "POST", body: JSON.stringify({ name }) })
        }
      />
    </div>
  );
}

export default App;
