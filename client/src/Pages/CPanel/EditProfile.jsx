import React, { useState } from "react";
import "./CPanel.css";

const EditProfile = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, email, password });
    // Aquí se enviarían los datos al backend
    onClose();
  };

  return (
    <div className="edit-profile-modal">
      <div className="edit-profile-content">
        <h2 className="modal-main-title">Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-title">Nombre: cambia tu nombre</div>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <div className="form-title">Email: cambia tu correo</div>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <div className="form-title">Contraseña: cambia tu contraseña</div>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div className="form-buttons">
            <button type="button" className="edit-profile-close" onClick={onClose}>Cancelar</button>
            <button type="submit" className="edit-profile-save">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;