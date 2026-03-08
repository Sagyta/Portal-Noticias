import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, getCategories, updateCategory, deleteCategory } from "../../../redux/action/action";
import Swal from "sweetalert2";
import "./Management.css"

const CategoryManager = ({ activeGestion, activeCrear }) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories || []);

  const [name, setName] = useState("");

  // =========================================
  // 🔹 Cargar categorías en Gestión
  // =========================================
  useEffect(() => {
    if (activeGestion === "Category") {
      dispatch(getCategories());
    }
  }, [dispatch, activeGestion]);

  // =========================================
  // 🔹 CREAR CATEGORÍA
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      Swal.fire({ icon: "warning", title: "Atención", text: "El nombre no puede estar vacío" });
      return;
    }

    try {
      await dispatch(createCategory({ name }));

      Swal.fire({ icon: "success", title: "Creada", text: `Categoría "${name}" creada` });

      setName("");

      if (activeGestion === "Category") {
        dispatch(getCategories()); // 🔹 refresca lista al instante
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo crear la categoría" });
      console.error(error);
    }
  };

  // =========================================
  // 🔹 EDITAR CATEGORÍA
  // =========================================
  const handleEdit = async (id, currentName) => {
    const { value: newName } = await Swal.fire({
      title: 'Editar categoría',
      input: 'text',
      inputLabel: 'Nuevo nombre',
      inputValue: currentName,
      showCancelButton: true,
      inputValidator: (value) => !value.trim() && 'El nombre no puede estar vacío'
    });

    if (newName) {
      try {
        await dispatch(updateCategory(id, { name: newName }));

        // 🔹 refresca lista en Gestión al instante
        if (activeGestion === "Category") {
          await dispatch(getCategories());
        }

        Swal.fire({
          icon: 'success',
          title: 'Actualizada',
          text: `Categoría "${newName}" actualizada correctamente`
        });
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar la categoría' });
        console.error("Error actualizando categoría:", error);
      }
    }
  };

  // =========================================
  // 🔹 BORRAR CATEGORÍA (placeholder)
  // =========================================
  const handleDelete = async (id, name) => {
    console.log("BORRAR categoría con id:", id);
    const result = await Swal.fire({
        title: `¿Borrar categoría "${name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
      });
    
      if (result.isConfirmed) {
        try {
          await dispatch(deleteCategory(id));
          Swal.fire({
            icon: "success",
            title: "Eliminada",
            text: `Categoría "${name}" borrada correctamente`,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo borrar la categoría",
          });
        }
      }
    };

  // =========================================
  // 🔹 RENDERIZADO CONDICIONAL
  // =========================================

  // FORMULARIO CREAR
  if (activeCrear === "Category") {
    return (
      <div>
        <h2>Crear Categoría</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-input"
            type="text"
            placeholder="Nombre de la categoría"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="form-button" type="submit">Crear</button>
        </form>
      </div>
    );
  }

  // LISTA GESTIÓN
  if (activeGestion === "Category") {
    return (
      <div className="category-list-container">
        <h2>Gestiona tus categorías</h2>
        <ul className="category-list">
          {categories.length > 0 ? (
            categories.map(cat => (
              <li key={cat.id}>
                {cat.name}{" "}
                <button className="btn btn-edit" onClick={() => handleEdit(cat.id, cat.name)}>Editar</button>{" "}
                <button className="btn btn-delete" onClick={() => handleDelete(cat.id, cat.name)}>Borrar</button>
              </li>
            ))
          ) : (
            <li>No hay categorías</li>
          )}
        </ul>
      </div>
    );
  }

  // MENSAJE POR DEFECTO
  return <p>Selecciona una sección</p>;
};

export default CategoryManager;