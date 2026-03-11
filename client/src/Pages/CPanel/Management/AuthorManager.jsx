import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAuthor, getAuthors, updateAuthor, deleteAuthor } from "../../../redux/action/action";
import Swal from "sweetalert2";
import "./Management.css";

const AuthorManager = ({ activeGestion, activeCrear }) => {

  const dispatch = useDispatch();
  const authors = useSelector(state => state.authors || []);

  const [displayName, setDisplayName] = useState("");

  // =========================================
  // Cargar autores en Gestión
  // =========================================
  useEffect(() => {
    if (activeGestion === "Author") {
      dispatch(getAuthors());
    }
  }, [dispatch, activeGestion]);

  // =========================================
  // Editar autores en Gestión
  // =========================================
  const handleEdit = async (id, currentName) => {

    const { value: newName } = await Swal.fire({
      title: "Editar Autor",
      input: "text",
      inputValue: currentName,
      showCancelButton: true,
      inputValidator: (value) => !value.trim() && "El nombre no puede estar vacío"
    });
  
    if (newName) {
  
      try {
  
        await dispatch(updateAuthor(id, { displayName: newName }));
  
        dispatch(getAuthors());
  
        Swal.fire({
          icon: "success",
          title: "Actualizado",
          text: "Autor actualizado correctamente"
        });
  
      } catch (error) {
  
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar el autor"
        });
  
      }
  
    }
  
  };

    // =========================================
  // Borrar autores en Gestión
  // =========================================

  const handleDelete = async (id, name) => {

    const result = await Swal.fire({
      title: `¿Borrar autor "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar"
    });
  
    if (result.isConfirmed) {
  
      try {
  
        await dispatch(deleteAuthor(id));
  
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "Autor borrado correctamente"
        });
  
      } catch (error) {
  
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo borrar el autor"
        });
  
      }
  
    }
  
  };

  // =========================================
  // CREAR AUTOR
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!displayName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "El nombre no puede estar vacío"
      });
      return;
    }

    try {

      await dispatch(createAuthor({ displayName }));

      Swal.fire({
        icon: "success",
        title: "Creado",
        text: `Autor "${displayName}" creado`
      });

      setDisplayName("");

      if (activeGestion === "Author") {
        dispatch(getAuthors());
      }

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el autor"
      });

      console.error(error);
    }
  };

  // =========================================
  // FORMULARIO CREAR
  // =========================================
  if (activeCrear === "Author") {

    return (
      <div>

        <h2>Crear Autor</h2>

        <form onSubmit={handleSubmit}>

          <input
            className="manager-form-input"
            type="text"
            placeholder="Nombre del autor"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <button className="manager-form-button" type="submit">
            Crear
          </button>

        </form>

      </div>
    );
  }

  // =========================================
  // LISTA GESTIÓN
  // =========================================
  if (activeGestion === "Author") {

    return (

      <div className="manager-list-container">

        <h2>Gestión de Autores</h2>

        <div className="manager-header">
          <span className="manager-title">ID</span>
          <span className="manager-title">Display Name</span>
          <div className="manager-item-buttons">Acciones</div>
        </div>

        <ul className="manager-list">

          {authors.length > 0 ? (

            authors.map((a) => (

              <li key={a.id} className="manager-list-item">

                <span className="manager-item">{a.id}</span>

                <span className="manager-item">{a.displayName}</span>

                <div className="manager-item-buttons">

                  <button className="manager-btn manager-btn-edit"
                  onClick={() => handleEdit(a.id, a.displayName)}>
                    Editar
                  </button>

                  <button className="manager-btn manager-btn-delete"
                  onClick={() => handleDelete(a.id, a.displayName)}>
                    Borrar
                  </button>

                </div>

              </li>

            ))

          ) : (

            <li>No hay autores</li>

          )}

        </ul>

      </div>

    );
  }

  return <p>Selecciona una sección</p>;

};

export default AuthorManager;