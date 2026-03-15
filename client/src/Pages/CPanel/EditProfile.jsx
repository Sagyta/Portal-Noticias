import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { updateUser } from "../../redux/action/action"; // ajusta la ruta si es distinta
import "./CPanel.css";

const EditProfile = ({ onClose, user }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construir objeto solo con campos modificados
    const updatedData = {};
    if (username && username !== user.username) updatedData.username = username;
    if (email && email !== user.email) updatedData.email = email;
    if (password) updatedData.password = password;

    console.log("Datos a enviar al backend:", updatedData); // <-- log agregado

    if (Object.keys(updatedData).length === 0) {
      Swal.fire({
        icon: "info",
        title: "Sin cambios",
        text: "No se modificó ningún dato",
      });
      return;
    }

    try {
      // Llamar a la misma action que usan los admins
      await dispatch(updateUser(user.id, updatedData));

      // Actualizar localStorage
      const newUserData = { ...user, ...updatedData };
      localStorage.setItem("user", JSON.stringify(newUserData));

      Swal.fire({
        icon: "success",
        title: "Perfil actualizado",
        text: "Tus cambios se guardaron correctamente",
      });

      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el perfil",
      });
    }
  };

  return (
    <div className="edit-profile-modal">
      <div className="edit-profile-content">
        <h2 className="modal-main-title">Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          {/* Nombre de usuario */}
          <div className="form-group">
            <div className="form-title">Nombre de usuario</div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Correo electrónico */}
          <div className="form-group">
            <div className="form-title">Correo electrónico</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Contraseña con icono */}
          <div className="form-group">
            <div className="form-title">Contraseña</div>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                style={{ flex: 1, paddingRight: "40px" }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "#333"
                }}
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
          </div>

          {/* Botones */}
          <div className="form-buttons">
            <button type="button" className="edit-profile-close" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="edit-profile-save">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
