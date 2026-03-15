import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { get_ads_lateral, create_ads_lateral } from "../../../redux/action/action";
import "./Management.css";

const AdsLateralManager = ({ activeGestion, activeCrear }) => {
  const dispatch = useDispatch();
  const ads_lateral = useSelector(state => state.ads_lateral || []);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  // 🔹 Cargar ads laterales
  useEffect(() => {
    if (activeGestion === "Ads Lateral") {
      dispatch(get_ads_lateral());
    }
  }, [dispatch, activeGestion]);

  // 🔹 Crear ad lateral
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(create_ads_lateral({ name, image, link }));
      Swal.fire({ icon: "success", title: "Creado", text: `Ad lateral "${name}" creado` });
      setName("");
      setImage("");
      setLink("");
      if (activeGestion === "Ads Lateral") dispatch(get_ads_lateral());
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo crear el ad lateral" });
    }
  };

  // 🔹 Renderizado para CREAR
  if (activeCrear === "Ads Lateral") {
    return (
      <div>
        <h2>Crear Publicidad Lateral</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="manager-form-input"
          />
          <input
            type="text"
            placeholder="Imagen"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="manager-form-input"
          />
          <input
            type="text"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="manager-form-input"
          />
          <button type="submit" className="manager-form-button">Crear</button>
        </form>
      </div>
    );
  }

  // 🔹 Renderizado para GESTIÓN
  if (activeGestion === "Ads Lateral") {
    console.log("🔹 ads_lateral en componente:", ads_lateral)  // <- aquí
    return (
      <div className="manager-list-container">
        <h2>Gestiona las Publicidades Laterales</h2>
        <div className="manager-list-header manager-header">
          <span className="manager-title">Nombre</span>
          <span className="manager-title">Imagen</span>
          <span className="manager-title">Link</span>
        </div>

        <ul className="manager-list">
          {ads_lateral.length > 0 ? (
            ads_lateral.map(ad => (
              <li key={ad.id}>
                <span className="manager-item">{ad.name}</span>
                <span className="manager-item">
                <img src={ad.image} alt={ad.name} className="manager-img" /></span>
                <span className="manager-item">
                <a href={ad.link} target="_blank" rel="noopener noreferrer">Link</a>
                </span>
              </li>
            ))
          ) : (
            <li>No hay Ads Laterales</li>
          )}
        </ul>
      </div>
    );
  }

  return <p>Selecciona una sección</p>;
};

export default AdsLateralManager;
