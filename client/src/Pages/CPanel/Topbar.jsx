import React, { useState } from "react";
import { useDispatch } from "react-redux"; // 🔹 Import dispatch
import { logout } from "../../redux/action/action"; // 🔹 Import acción logout
import { useNavigate } from "react-router-dom"; // 🔹 Import navigate
import EditProfile from "./EditProfile"; // Importamos el componente de modal
import "./CPanel.css"; // Usamos la misma hoja de estilos


const Topbar = ({ user }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para abrir el modal
  const dispatch = useDispatch(); // 🔹 Inicializamos dispatch
  const navigate = useNavigate(); // 🔹 Inicializamos navigate

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  const handleEditProfile = () => {
    setShowModal(true); // Mostrar el modal
    setOpenDropdown(false); // Cerrar el dropdown al abrir el modal
  };

  // 🔹 Nueva función para logout
  const handleLogout = () => {
    dispatch(logout()); // limpia Redux
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // opcional, si no lo limpia la acción
    navigate("/login", { replace: true }); // redirige al login
  };

  const handleCloseModal = () => setShowModal(false); // Cerrar el modal

  return (
    
    <div className="topbar">
      <div className="topbar-logo">Radar Informativo</div>
      <div className="topbar-user-container">
        <div className="topbar-user" onClick={toggleDropdown}>
        {console.log("Topbar user:", user)}
        {user ? `${user.username} (${user.roleName})` : null} ▼
        </div>
        {openDropdown && (
          <div className="topbar-dropdown">
            <button className="dropdown-item" onClick={handleEditProfile}>
              Editar perfil
            </button>
            <div className="dropdown-separator"></div>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {showModal && <EditProfile onClose={handleCloseModal} />}
    </div>
  );
};

export default Topbar;