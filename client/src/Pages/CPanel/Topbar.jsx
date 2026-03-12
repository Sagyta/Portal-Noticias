import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action/action";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import { FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa"; // icono de usuario
import "./CPanel.css";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  const handleEditProfile = () => {
    setShowModal(true);
    setOpenDropdown(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="topbar">
      {/* Logo */}
      <div className="topbar-logo">Radar Informativo</div>

      {/* Buscador */}
      <div className="topbar-search">
        <input type="text" placeholder="Buscar..." className="search-input" />
      </div>

      {/* Iconos y avatar */}
      <div className="topbar-right">
        <FaBell className="topbar-icon" />
        <FaEnvelope className="topbar-icon" />

        {/* Icono de usuario que abre dropdown */}
        <div className="topbar-user-container">
          <FaUserCircle
            className="user-icon"
            onClick={toggleDropdown}
          />

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
      </div>

      {showModal && <EditProfile onClose={handleCloseModal} user={user} />}
    </div>
  );
};

export default Topbar;