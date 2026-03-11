import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoles, createRole, updateRole, deleteRole } from "../../../redux/action/action";
import Swal from "sweetalert2";
import "./Management.css";

const RoleManager = ({ activeGestion, activeCrear }) => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles || []);
  const token = useSelector((state) => state.token); // 🔹 token desde Redux

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // 🔹 Cargar roles
  useEffect(() => {
    if (activeGestion === "Role") {
      dispatch(getRoles(token));
    }
  }, [dispatch, activeGestion, token]);

  // 🔹 Crear rol
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return Swal.fire({ icon: "warning", title: "Atención", text: "El nombre no puede estar vacío" });
    }
    try {
      await dispatch(createRole({ name, description }, token));
      Swal.fire({ icon: "success", title: "Creado", text: `Rol "${name}" creado` });
      setName("");
      setDescription("");
      dispatch(getRoles(token));
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo crear el rol" });
      console.error(error);
    }
  };

  // 🔹 Editar rol
  const handleEdit = async (role) => {
    const { value: formValues } = await Swal.fire({
      title: "Editar rol",
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="${role.name}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Descripción" value="${role.description}">`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const n = document.getElementById("swal-input1").value;
        const d = document.getElementById("swal-input2").value;
        if (!n.trim()) Swal.showValidationMessage("El nombre no puede estar vacío");
        return { name: n, description: d };
      },
    });

    if (formValues) {
      try {
        await dispatch(updateRole(role.id, formValues, token));
        Swal.fire({ icon: "success", title: "Actualizado", text: `Rol "${formValues.name}" actualizado` });
        dispatch(getRoles(token));
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: "No se pudo actualizar el rol" });
      }
    }
  };

  // 🔹 Borrar rol
  const handleDelete = async (role) => {
    const result = await Swal.fire({
      title: `¿Borrar rol "${role.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteRole(role.id, token));
        Swal.fire({ icon: "success", title: "Eliminado", text: `Rol "${role.name}" borrado` });
        dispatch(getRoles(token));
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: "No se pudo borrar el rol" });
      }
    }
  };

  // 🔹 Formulario Crear
  if (activeCrear === "Role") {
    return (
      <div>
        <h2>Crear Rol</h2>
        <form onSubmit={handleCreate}>
          <input className="manager-form-input" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="manager-form-input" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button className="manager-form-button" type="submit">Crear</button>
        </form>
      </div>
    );
  }

  // 🔹 Gestión de roles
  if (activeGestion === "Role") {
    return (
      <div className="manager-list-container">
        <h2>Gestión de Roles</h2>

        {/* Header */}
        <div className="manager-list-header manager-header">
          <span className="manager-title-short">ID</span>
          <span className="manager-title">Título</span>
          <span className="manager-title-long">Descripción</span>
          <div className="manager-item-buttons">Acciones</div>
        </div>

        {/* Lista */}
        <ul className="manager-list">
          {roles.length > 0 ? (
            roles.map((role) => (
              <li key={role.id} className="manager-list-item manager-item">
                <span className="manager-item-short">{role.id}</span>
                <span className="manager-item">{role.name}</span>
                <span className="manager-item-long">{role.description}</span>
                <div className="manager-item-buttons">
                  <button className="manager-btn manager-btn-edit" onClick={() => handleEdit(role)}>Editar</button>
                  <button className="manager-btn manager-btn-delete" onClick={() => handleDelete(role)}>Borrar</button>
                </div>
              </li>
            ))
          ) : (
            <li>No hay roles</li>
          )}
        </ul>
      </div>
    );
  }

  return <p>Selecciona una sección</p>;
};

export default RoleManager;