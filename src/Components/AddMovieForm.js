import { useState } from "react";

const AddMovieForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleForm}>
      <label htmlFor="name">Nombre</label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      {submitted && !name && <div>El nombre es obligatorio</div>}
      <button type="submit">Añadir película</button>
    </form>
  );
};

export default AddMovieForm;
