import { render, screen } from "@testing-library/react";
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

function givenTheComponentIsRendered() {
  render(<AddMovieForm />);
}

function whenFormIsSubmitted() {
  const button = screen.getByRole("button", { name: "Añadir película" });
  userEvent.click(button);
}

function whenFormIsCorrect() {
  const name = screen.getByLabelText("Nombre");
  userEvent.type(name, "Matrix");
}
