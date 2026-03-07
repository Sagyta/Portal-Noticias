import React from "react";

const EditProfile = ({ onClose }) => {
  return (
    <div className="edit-profile-modal">
      <div className="edit-profile-content">
        <h2>Editar Perfil</h2>
        {/* Aquí van los campos del formulario */}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default EditProfile;