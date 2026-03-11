import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action/action";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import "./CPanel.css";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user); // 🔹 usuario logueado desde Redux

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
      <div className="topbar-logo">Radar Informativo</div>

      <div className="topbar-user-container">
        <div className="topbar-user" onClick={toggleDropdown}>
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

      {showModal && <EditProfile onClose={handleCloseModal} user={user} />}
    </div>
  );
};

export default Topbar;