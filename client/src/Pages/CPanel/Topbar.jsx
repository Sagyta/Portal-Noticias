import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, getModifications, markAsRead } from "../../redux/action/action";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import "./CPanel.css";
import { FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";

const Topbar = ({ setShowNotifHistory }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const modifications = useSelector((state) => state.modifications || []);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const timeAgo = (date) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000);
    if (diff < 60) return `Hace ${diff}s`;
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)}min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)}h`;
    return `Hace ${Math.floor(diff / 86400)}d`;
  };

  useEffect(() => {
    setNotifications(modifications);
  }, [modifications]);

  useEffect(() => {
    dispatch(getModifications());
  }, [dispatch]);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);
  const toggleNotifDropdown = () => setShowNotifDropdown(!showNotifDropdown);

  const handleEditProfile = () => {
    setShowModal(true);
    setOpenDropdown(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const handleNotificationClick = async (mod) => {
    await dispatch(markAsRead(mod.id));

    setNotifications((prev) =>
      prev.map((n) => (n.id === mod.id ? { ...n, read: true } : n))
    );

    setSelectedNotification(mod);
  };

  const userModifications = notifications.filter((m) => m.receiverId === user.id);
  const unreadModifications = userModifications.filter((m) => !m.read);
  const unreadCount = unreadModifications.length;

  return (
    <div className="topbar">
      <div className="topbar-logo">Radar Informativo</div>

      <div className="topbar-search">
        <input type="text" placeholder="Buscar..." className="search-input" />
      </div>

      <div className="topbar-right">
        <FaBell className="topbar-icon" />

        {/* Notificaciones */}
        <div style={{ position: "relative" }}>
          <FaEnvelope className="topbar-icon" onClick={toggleNotifDropdown} />
          {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}

          {showNotifDropdown && (
            <div className="topbar-dropdown notif-dropdown">

              {unreadModifications.length > 0 ? (
                unreadModifications.map((m) => (
                  <div
                    key={m.id}
                    className="dropdown-item unread"
                    onClick={() => handleNotificationClick(m)}
                  >
                    <span>
                      {timeAgo(m.createdAt)} - tu noticia fue {m.action}
                    </span>
                  </div>
                ))
              ) : (
                <div className="dropdown-item">
                  No hay nuevas notificaciones
                </div>
              )}

              {/* Abrir historial en Content */}
              <div
                className="dropdown-item dropdown-history"
                onClick={() => {
                  setShowNotifDropdown(false);
                  setShowNotifHistory(true);
                }}
              >
                Ver historial de notificaciones →
              </div>

            </div>
          )}
        </div>

        {/* Usuario */}
        <div className="topbar-user-container" style={{ position: "relative" }}>
          <span className="topbar-username">
            {user?.username || "Usuario"}
          </span>

          <FaUserCircle className="user-icon" onClick={toggleDropdown} />

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

          {/* Modal detalle notificación */}
          {selectedNotification && (
            <div
              className="notif-modal-overlay"
              onClick={() => setSelectedNotification(null)}
            >
              <div
                className="notif-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>{selectedNotification.new?.title || "Sin título"}</h3>

                <p>
                  <strong>Acción:</strong> {selectedNotification.action}
                  <br />
                  <strong>Usuario:</strong>{" "}
                  {selectedNotification.user?.username || "Sistema"}
                  <br />
                  <strong>Fecha:</strong>{" "}
                  {new Date(selectedNotification.createdAt).toLocaleString()}
                </p>

                <button className="notif-close-btn" onClick={() => setSelectedNotification(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {showModal && (
        <EditProfile
          onClose={() => setShowModal(false)}
          user={user}
        />
      )}
    </div>
  );
};

export default Topbar;