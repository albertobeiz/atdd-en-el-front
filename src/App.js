import "./App.css";
import AddMovieForm from "./Components/AddMovieForm";

function App() {
  return (
    <div>
      <AddMovieForm onSubmit={() => new Promise((resolve) => setTimeout(resolve, 5))} />
      <div>No movies in your list</div>
    </div>
  );
}

export default App;
