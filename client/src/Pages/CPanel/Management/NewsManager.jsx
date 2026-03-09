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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    };

    try {
      await dispatch(createNews(data, token));

      Swal.fire({
        icon: "success",
        title: "Creada",
        text: `Noticia "${title}" creada correctamente`,
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
            className="btn-back"
            onClick={() => setEditingNews(null)}
        >
            ← Volver a Gestión
        </button>
        <h2>Editar Noticia</h2>

        <input
          className="form-input"
          type="text"
          value={editingNews.title}
          onChange={(e) =>
            setEditingNews({ ...editingNews, title: e.target.value })
          }
        />

        <input
          className="form-input"
          type="text"
          value={editingNews.subtitle}
          onChange={(e) =>
            setEditingNews({ ...editingNews, subtitle: e.target.value })
          }
        />

        <input
          className="form-input"
          type="text"
          value={editingNews.image || ""}
          placeholder="URL imagen"
          onChange={(e) =>
            setEditingNews({ ...editingNews, image: e.target.value })
          }
        />

        <input
          className="form-input"
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
          className="news-category-select"
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

        <button className="form-button" onClick={handleUpdate}>
          Guardar cambios
        </button>

        <button
          className="form-button"
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

        <form onSubmit={handleSubmit}>

          <input
            className="form-input"
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="form-input"
            type="text"
            placeholder="Subtítulo"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <input
            className="form-input"
            type="text"
            placeholder="URL imagen"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <input
            className="form-input"
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
            className="news-category-select"
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

          <button className="form-button" type="submit">
            Crear
          </button>

        </form>

      </div>
    );
  }

  if (activeGestion === "News") {
    return (
      <div className="list-container">

        <h2>Gestión de Noticias</h2>

        <div className="list-header news-header">
          <span className="news-title">Título</span>
          <span className="news-category">Categoría</span>
          <span className="news-author">Autor</span>
          <span className="news-date">Fecha</span>
          <div className="item-buttons">Acciones</div>
        </div>

        <ul className="list">

          {news.length > 0 ? (

            news.map((n) => (

              <li key={n.id} className="list-item news-item">
                <span className="news-thumbnail">
                {n.image ? <img src={n.image} alt={n.title} /> : <span>No Img</span>}
                </span>
                <span className="news-title">{n.title}</span>
                <span className="news-category">{n.category?.name}</span>
                <span className="news-author">{n.author?.displayName}</span>
                <span className="news-date">
                {new Date(n.updatedAt || n.createdAt).toLocaleString()}
                </span>

                <div className="item-buttons">

                  <button className="btn btn-edit" onClick={() => setEditingNews(n)}>
                    Editar</button>
                  <button className="btn btn-delete" onClick={() => handleDeleteNews(n.id, n.title)}>
                    Borrar </button>

                </div>

              </li>

            ))

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