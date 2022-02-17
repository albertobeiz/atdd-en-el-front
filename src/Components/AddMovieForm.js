import { useState } from "react";

const AddMovieForm = ({ onSubmit }) => {
  const [status, setStatus] = useState("INITIAL");
  const [name, setName] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setStatus("LOADING");

    try {
      await onSubmit({ name });
      setStatus("SUCCESS");
    } catch (error) {
      setStatus("ERROR");
    }
  };

  return (
    <form onSubmit={handleForm}>
      <label htmlFor="name">Nombre</label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      {status !== "INITIAL" && !name && <div>El nombre es obligatorio</div>}
      {status !== "LOADING" && <button type="submit">Añadir película</button>}
      {status === "LOADING" && <div>Añadiendo...</div>}
      {status === "ERROR" && <div>No se pudo añadir la película</div>}
      {status === "SUCCESS" && <div>¡Película Añadida!</div>}
    </form>
  );
};

export default AddMovieForm;
