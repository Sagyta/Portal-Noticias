import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNews, getNews, getCategories, updateNews, deleteNews } from "../../../redux/action/action";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Management.css";

const NewsManager = ({ activeGestion, activeCrear }) => {
  const dispatch = useDispatch();
  const { news, categories, user, token } = useSelector((state) => state);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [authorId, setAuthorId] = useState(user?.id || "");

  const [editingNews, setEditingNews] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (activeGestion === "News") {
      dispatch(getNews());
    }
  }, [dispatch, activeGestion]);

  useEffect(() => {
    if (activeCrear === "News" || activeGestion === "News") {
      dispatch(getCategories());
    }
  }, [dispatch, activeCrear, activeGestion]);

  // 🔹 CREAR NOTICIA (BORRADOR O PUBLICADA)
  const handleSubmit = async (status) => {

    if (!title.trim() || !text.trim() || !categoryId || !authorId) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Los campos título, texto, categoría y autor son obligatorios",
      });
      return;
    }

    const data = {
      title,
      subtitle,
      text,
      image,
      videoLink,
      categoryId,
      userId: user?.id,
      authorId: user?.authorId,
      status: status // 🔹 aquí definimos si es pending o approved
    };

    try {
      await dispatch(createNews(data, token));

      Swal.fire({
        icon: "success",
        title: status === "approved" ? "Publicada" : "Guardada",
        text: `Noticia "${title}" ${status === "approved" ? "publicada correctamente" : "guardada como borrador"}`,
      });

      setTitle("");
      setSubtitle("");
      setText("");
      setImage("");
      setVideoLink("");
      setCategoryId("");
      setAuthorId(user?.id || "");

      dispatch(getNews());

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear la noticia",
      });

    }
  };

  const handleUpdate = async () => {
    try {

      await dispatch(updateNews(editingNews.id, editingNews, token));

      Swal.fire({
        icon: "success",
        title: "Actualizada",
        text: `Noticia "${editingNews.title}" actualizada`,
      });

      setEditingNews(null);
      dispatch(getNews());

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar",
      });

    }
  };

  const handleDeleteNews = async (id, title) => {

    const result = await Swal.fire({
      title: `¿Borrar noticia "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {

      try {

        await dispatch(deleteNews(id, token));

        Swal.fire({
          icon: "success",
          title: "Eliminada",
          text: `Noticia "${title}" borrada`,
        });

        dispatch(getNews());

      } catch (error) {

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo borrar",
        });

      }

    }

  };

  if (editingNews) {
    return (
      <div>
        <button
            className="manager-btn-back"
            onClick={() => setEditingNews(null)}
        >
            ← Volver a Gestión
        </button>
        <h2>Editar Noticia</h2>

        <input
          className="manager-form-input"
          type="text"
          value={editingNews.title}
          onChange={(e) =>
            setEditingNews({ ...editingNews, title: e.target.value })
          }
        />

        <input
          className="manager-form-input"
          type="text"
          value={editingNews.subtitle}
          onChange={(e) =>
            setEditingNews({ ...editingNews, subtitle: e.target.value })
          }
        />

        <input
          className="manager-form-input"
          type="text"
          value={editingNews.image || ""}
          placeholder="URL imagen"
          onChange={(e) =>
            setEditingNews({ ...editingNews, image: e.target.value })
          }
        />

        <input
          className="manager-form-input"
          type="text"
          value={editingNews.videoLink || ""}
          placeholder="URL video"
          onChange={(e) =>
            setEditingNews({ ...editingNews, videoLink: e.target.value })
          }
        />

        <ReactQuill
          theme="snow"
          value={editingNews.text}
          onChange={(value) =>
            setEditingNews({ ...editingNews, text: value })
          }
        />

        <select
          className="manager-select"
          value={editingNews.categoryId}
          onChange={(e) =>
            setEditingNews({ ...editingNews, categoryId: e.target.value })
          }
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button className="manager-form-button" onClick={handleUpdate}>
          Guardar cambios
        </button>

        <button
          className="manager-form-button"
          onClick={() => setEditingNews(null)}
        >
          Cancelar
        </button>

      </div>
    );
  }

  if (activeCrear === "News") {
    return (
      <div>
        <h2>Crear Noticia</h2>

        {/* 🔹 IMPORTANTE: evitamos submit automático */}
        <form onSubmit={(e) => e.preventDefault()}>

          <input
            className="manager-form-input"
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="manager-form-input"
            type="text"
            placeholder="Subtítulo"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <input
            className="manager-form-input"
            type="text"
            placeholder="URL imagen"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <input
            className="manager-form-input"
            type="text"
            placeholder="URL video"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />

          <ReactQuill
            theme="snow"
            value={text}
            onChange={setText}
          />

          <select
            className="manager-select"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Seleccionar categoría</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}

          </select>

          {/* 🔹 BOTONES NUEVOS */}
          <button
            type="button"
            className="manager-form-button"
            onClick={() => handleSubmit("pending")}
          >
            Guardar borrador
          </button>

          <button
            type="button"
            className="manager-form-button"
            onClick={() => handleSubmit("approved")}
          >
            Publicar
          </button>

        </form>

      </div>
    );
  }
// 🔹 filtrar noticias según estado
const filteredNews = news.filter((n) => {
  if (statusFilter === "all") return true;
  return n.status === statusFilter;
});
  if (activeGestion === "News") {
    return (
      <div className="manager-list-container">

        <h2>Gestión de Noticias</h2>

        {/* 🔹 filtro de noticias */}
<div className="manager-filter">

<button className={statusFilter === "all" ? "active" : ""} onClick={() => setStatusFilter("all")}>Todas</button>
<button className={statusFilter === "pending" ? "active" : ""} onClick={() => setStatusFilter("pending")}>Pendientes</button>
<button className={statusFilter === "approved" ? "active" : ""} onClick={() => setStatusFilter("approved")}>Publicadas</button>
<button className={statusFilter === "rejected" ? "active" : ""} onClick={() => setStatusFilter("rejected")}>Rechazadas</button>

</div>{/* fin filtro */}

        <div className="manager-list-header manager-header">
        <span className="manager-title-short">Img</span>
          <span className="manager-title-long">Título</span>
          <span className="manager-title">Categoría</span>
          <span className="manager-title">Autor</span>
          <span className="manager-title">Fecha</span>
          <span className="manager-title">Estado</span>
          <div className="manager-title">Acciones</div>
        </div>

        <ul className="manager-list">

          {news.length > 0 ? (

            filteredNews.map((n) => {

              console.log("Status de la noticia:", n.status);

              return (
              <li key={n.id} className="manager-list-item manager-item">
                <span className="manager-thumbnail">
                {n.image ? <img src={n.image} alt={n.title} /> : <span>No Img</span>}
                </span>
                <span className="manager-item-long">{n.title}</span>
                <span className="manager-item">{n.category?.name}</span>
                <span className="manager-item">{n.author?.displayName}</span>
                <span className="manager-item">
                {new Date(n.updatedAt || n.createdAt).toLocaleString()}
                </span>

                <span className="manager-item">
                  {n.status === "pending" ? "Pendiente" :
                   n.status === "approved" ? "Publicada" :
                   n.status === "rejected" ? "Rechazada" : ""}
                </span>

                <div className="manager-item-buttons">

                  <button className="manager-btn manager-btn-edit" onClick={() => setEditingNews(n)}>
                    Editar</button>

                  <button className="manager-btn manager-btn-delete" onClick={() => handleDeleteNews(n.id, n.title)}>
                    Borrar </button>

                </div>

              </li>
            )}) 

          ) : (

            <li>No hay noticias</li>

          )}

        </ul>

      </div>
    );
  }

  return <p>Selecciona una sección</p>;
};

export default NewsManager;