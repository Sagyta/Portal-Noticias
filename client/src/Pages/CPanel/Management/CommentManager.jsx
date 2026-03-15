import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getComments, deleteComment } from "../../../redux/action/action";
import "./Management.css";

const CommentManager = ({ activeGestion }) => {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments || []);
  console.log('comentarios', comments)

  // 🔹 Cargar comentarios
  useEffect(() => {
    if (activeGestion === "Comment") {
      dispatch(getComments());
    }
  }, [dispatch, activeGestion]);

  // 🔹 Borrar comentario
  const handleDelete = async (id, username) => {
    const result = await Swal.fire({
      title: `¿Borrar comentario de "${username}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteComment(id));
        Swal.fire({ icon: "success", title: "Eliminado", text: "Comentario borrado correctamente" });
        dispatch(getComments()); // refresca la lista
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: "No se pudo borrar el comentario" });
      }
    }
  };

  // 🔹 Renderizado lista
  if (activeGestion === "Comments") {
    return (
      <div className="manager-list-container">
        <h2>Gestiona los comentarios</h2>
        <div className="manager-list-header manager-header">
          <span className="manager-title">Usuario</span>
          <span className="manager-title">Comentario</span>
          <span className="manager-title">Fecha</span>
          <div className="manager-item-buttons">Acciones</div>
        </div>

        <ul className="manager-list">
          {comments.length > 0 ? (
            comments.map(c => (
              <li key={c.id}>
                <span className="manager-item">{c.username}</span>
                <span className="manager-item">{c.comment}</span>
                <span className="manager-item">{new Date(c.createdAt).toLocaleString()}</span>
                <div className="manager-item-buttons">
                  <button className="manager-btn manager-btn-delete" onClick={() => handleDelete(c.id, c.username)}>Borrar</button>
                </div>
              </li>
            ))
          ) : (
            <li>No hay comentarios</li>
          )}
        </ul>
      </div>
    );
  }

  return <p>Selecciona una sección</p>;
};

export default CommentManager;
