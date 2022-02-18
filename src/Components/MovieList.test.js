import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import MovieList from "./MovieList";

test("Calls getMovies", () => {
  const getMovies = jest.fn(() => new Promise(() => {}));
  givenTheComponentIsRendered(getMovies);

  expect(getMovies).toHaveBeenCalledTimes(1);
});

test("Shows Loader", () => {
  givenTheComponentIsRendered(() => new Promise(() => {}));
  expect(screen.getByText("Cargando películas...")).toBeInTheDocument();
});

test("Shows Load Error", async () => {
  givenTheComponentIsRendered(() => Promise.reject());

  await waitForElementToBeRemoved(screen.queryByText("Cargando películas..."));

  expect(screen.getByText("No se pudo cargar la lista")).toBeInTheDocument();
});

test("Shows Empty State", async () => {
  givenTheComponentIsRendered(() => Promise.resolve([]));

  await waitForElementToBeRemoved(screen.queryByText("Cargando películas..."));

  expect(screen.getByText("No hay películas añadidas")).toBeInTheDocument();
});

test("Shows Movie List", async () => {
  const movies = [
    { id: 1, name: "Matrix" },
    { id: 2, name: "Dune" },
  ];

  givenTheComponentIsRendered(() => Promise.resolve(movies));

  await waitForElementToBeRemoved(screen.queryByText("Cargando películas..."));
  movies.forEach((movie) => {
    expect(screen.getByText(movie.id)).toBeInTheDocument();
    expect(screen.getByText(movie.name)).toBeInTheDocument();
  });
});

test("Refreshes Movies", async () => {
  const movies = [
    { id: 1, name: "Matrix" },
    { id: 2, name: "Dune" },
  ];
  const getMovies = jest.fn().mockResolvedValueOnce([]).mockResolvedValueOnce(movies);

  const { rerender } = givenTheComponentIsRendered(getMovies);

  await waitForElementToBeRemoved(screen.queryByText("Cargando películas..."));
  expect(screen.getByText("No hay películas añadidas")).toBeInTheDocument();

  rerender(<MovieList getMovies={getMovies} refresh={false} />);
  rerender(<MovieList getMovies={getMovies} refresh={true} />);
  await waitForElementToBeRemoved(screen.queryByText("Cargando películas..."));

  movies.forEach((movie) => {
    expect(screen.getByText(movie.id)).toBeInTheDocument();
    expect(screen.getByText(movie.name)).toBeInTheDocument();
  });
});

function givenTheComponentIsRendered(getMovies, refresh = true) {
  return render(<MovieList getMovies={getMovies} refresh={refresh} />);
}
