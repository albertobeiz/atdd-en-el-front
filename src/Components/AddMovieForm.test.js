import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddMovieForm from "./AddMovieForm";

const NAME_REQUIRED = "El nombre es obligatorio";

test("Hides name required message on start", () => {
  givenTheComponentIsRendered();
  expect(screen.queryByText(NAME_REQUIRED)).toBeNull();
});

test("Shows name required message on bad submit", () => {
  givenTheComponentIsRendered();

  whenFormIsSubmitted();

  expect(screen.getByText(NAME_REQUIRED)).toBeInTheDocument();
});

test("Hides name required message on correct submit", () => {
  givenTheComponentIsRendered();

  whenFormIsCorrect();
  whenFormIsSubmitted();

  expect(screen.queryByText(NAME_REQUIRED)).toBeNull();
});

test("Shows loader on correct submit", async () => {
  givenTheComponentIsRendered(() => new Promise(() => {}));

  whenFormIsCorrect();
  whenFormIsSubmitted();

  expect(screen.queryByText("Añadir película")).toBeNull();
  expect(screen.getByText("Añadiendo...")).toBeInTheDocument();
});

test("Shows error message when fails", async () => {
  givenTheComponentIsRendered(() => Promise.reject("ERROR"));

  whenFormIsCorrect();
  whenFormIsSubmitted();

  await waitForElementToBeRemoved(screen.queryByText("Añadiendo..."));
  expect(screen.getByText("No se pudo añadir la película")).toBeInTheDocument();
});

test("Shows success message", async () => {
  givenTheComponentIsRendered(() => Promise.resolve());

  whenFormIsCorrect();
  whenFormIsSubmitted();

  await waitForElementToBeRemoved(screen.queryByText("Añadiendo..."));
  expect(screen.getByText("¡Película Añadida!")).toBeInTheDocument();
});

test("Calls onSubmit with correct params", async () => {
  const onSubmit = jest.fn();
  givenTheComponentIsRendered(onSubmit);

  whenFormIsCorrect();
  whenFormIsSubmitted();

  await waitForElementToBeRemoved(screen.queryByText("Añadiendo..."));
  expect(onSubmit).toHaveBeenCalledWith({ name: "Matrix" });
});

function givenTheComponentIsRendered(onSubmit) {
  render(<AddMovieForm onSubmit={onSubmit} />);
}

function whenFormIsSubmitted() {
  const button = screen.getByRole("button", { name: "Añadir película" });
  userEvent.click(button);
}

function whenFormIsCorrect() {
  const name = screen.getByLabelText("Nombre");
  userEvent.type(name, "Matrix");
}
