// Pages/CPanel/Management/UserManager.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, createUser, updateUser, deleteUser, getRoles, getAuthors, resetUserPassword } from "../../../redux/action/action";
import Swal from "sweetalert2";
import "./Management.css";

const UserManager = ({ activeGestion, activeCrear }) => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users || []);
  const roles = useSelector(state => state.roles || []);
  const authors = useSelector(state => state.authors || []);
  const loggedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [form, setForm] = useState({
    username: "",
    email: "",
    roleId: "",
    authorId: ""
  });


  // =========================================
  // CARGAR USUARIOS
  // =========================================
  useEffect(() => {
    if (activeGestion === "Users") {
      dispatch(getUsers());
    }
  }, [dispatch, activeGestion]);

  // =========================================
  // CARGAR ROLES Y AUTORES PARA CREAR
  // =========================================
  useEffect(() => {
    if (activeCrear === "Users") {
      dispatch(getRoles());
      dispatch(getAuthors());
    }
  }, [dispatch, activeCrear]);

  // =========================================
  // MANEJAR INPUTS
  // =========================================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // =========================================
  // DESCARGAR TXT CON CREDENCIALES
  // =========================================
  const downloadCredentials = (username, email, password) => {
    const text =
      "Usuario: " + username + "\r\n" +
      "Email: " + email + "\r\n" +
      "Password: " + password;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `credenciales-${username}.txt`;
    link.click();
  };

  // =========================================
  // RESET PASSWORD
  // =========================================
  const handleResetPass = async (userId, username) => {
    try {
      const data = await dispatch(resetUserPassword(userId));

      Swal.fire({
        title: `Contraseña reseteada para ${username}`,
        html: `<p>Nueva contraseña: <strong>${data.temporaryPassword}</strong></p>`,
        showCancelButton: true,
        confirmButtonText: 'Descargar TXT',
        cancelButtonText: 'Cerrar',
        focusConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
          const blob = new Blob([data.temporaryPassword], { type: 'text/plain' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${username}_password.txt`;
          link.click();
          URL.revokeObjectURL(link.href);
        }
      });

    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  // =========================================
// EDITAR USUARIO COMPLETO
// =========================================
const handleEdit = (user) => {
  // Construir opciones HTML para roles
  const roleOptions = roles.map(r => 
    `<option value="${r.id}" ${r.id === user.role?.id ? "selected" : ""}>${r.name}</option>`
  ).join("");

  // Opciones HTML para autores
  const authorOptions = authors.map(a => 
    `<option value="${a.id}" ${a.id === user.author?.id ? "selected" : ""}>${a.displayName}</option>`
  ).join("");

  Swal.fire({
    title: "Editar usuario",
    html: `
      <input id="swal-username" class="swal2-input" value="${user.username}" placeholder="Username">
      <input id="swal-email" class="swal2-input" value="${user.email}" placeholder="Email" type="email">
      <select id="swal-role" class="swal2-input">
        <option value="">Seleccionar Rol</option>
        ${roleOptions}
      </select>
      <select id="swal-author" class="swal2-input">
        <option value="">Seleccionar Autor</option>
        ${authorOptions}
      </select>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const username = document.getElementById("swal-username").value;
      const email = document.getElementById("swal-email").value;
      const roleId = document.getElementById("swal-role").value;
      const authorId = document.getElementById("swal-author").value;

      if (!username || !email || !roleId || !authorId) {
        Swal.showValidationMessage("Todos los campos son obligatorios");
      }

      return { username, email, roleId, authorId };
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await dispatch(updateUser(user.id, result.value));
        Swal.fire("Actualizado", "Usuario actualizado correctamente", "success");
        dispatch(getUsers());
      } catch (error) {
        Swal.fire("Error", "No se pudo actualizar", "error");
      }
    }
  });
};

  // =========================================
  // BORRAR USUARIO
  // =========================================
  const handleDelete = (userId, username) => {

    Swal.fire({
      title: `¿Quieres borrar al usuario: "${username}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí borrar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {

      if (result.isConfirmed) {

        try {

          await dispatch(deleteUser(userId));

          Swal.fire("Borrado", "Usuario eliminado", "success");

          dispatch(getUsers());

        } catch (error) {

          Swal.fire("Error", "No se pudo borrar", "error");

        }

      }

    });

  };

  // =========================================
  // CREAR USUARIO
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.roleId || !form.authorId) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Todos los campos son obligatorios"
      });
      return;
    }

    try {
      const newUser = await dispatch(createUser(form));

      Swal.fire({
        icon: "success",
        title: "Usuario creado",
        html: `
          <p><b>Username:</b> ${newUser.user.username}</p>
          <p><b>Password:</b> ${newUser.temporaryPassword}</p>
        `,
        confirmButtonText: "Descargar credenciales"
      }).then(() => {
        downloadCredentials(
          newUser.user.username,
          newUser.user.email,
          newUser.temporaryPassword
        );
      });

      setForm({
        username: "",
        email: "",
        roleId: "",
        authorId: ""
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el usuario"
      });
    }
  };

  // =========================================
  // FORMULARIO CREAR
  // =========================================
  if (activeCrear === "Users") {
    return (
      <div>
        <h2>Crear Usuario</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="manager-form-input"
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />

          <input
            className="manager-form-input"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <select
            className="manager-select"
            name="roleId"
            value={form.roleId}
            onChange={handleChange}
          >
            <option value="">Seleccionar Rol</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>

          <select
            className="manager-select"
            name="authorId"
            value={form.authorId}
            onChange={handleChange}
          >
            <option value="">Seleccionar Autor</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>
                {author.displayName}
              </option>
            ))}
          </select>

          <button
            className="manager-form-button"
            type="submit"
          >
            Crear Usuario
          </button>
        </form>
      </div>
    );
  }

  // =========================================
  // GESTIÓN
  // =========================================
  if (activeGestion === "Users") {
    return (
      <div className="manager-list-container">
        <h2>Gestión de Usuarios</h2>

        <div className="manager-header">
          <span className="manager-title">Nombre</span>
          <span className="manager-title-long">Email</span>
          <span className="manager-title">Rol</span>
          <span className="manager-title">Autor</span>
          <div className="manager-title">Acciones</div>
          <div className="manager-item-button">Resetear</div>
        </div>

        <ul className="manager-list">
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id} className="manager-list-item">
                <span className="manager-item">{user.username}</span>
                <span className="manager-item-long">{user.email}</span>
                <span className="manager-item">{user.role?.name || "Sin rol"}</span>
                <span className="manager-item">{user.author?.displayName || "Sin autor"}</span>

                <div className="manager-item-buttons">

                  <button
                    className="manager-btn manager-btn-edit"
                    onClick={() => handleEdit(user)}
                  >
                    Editar
                  </button>

                  <button
                    className="manager-btn manager-btn-delete"
                    onClick={() => handleDelete(user.id, user.username)}
                  >
                    Borrar
                  </button>

                  {loggedUser.roleId === 1 && (
                    <button
                      className="manager-item-btn"
                      onClick={() => handleResetPass(user.id, user.username)}
                    >
                      Reset Pass
                    </button>
                  )}

                </div>
              </li>
            ))
          ) : (
            <li>No hay usuarios</li>
          )}
        </ul>
      </div>
    );
  }

  return <p>Selecciona una sección</p>;
};

export default UserManager;