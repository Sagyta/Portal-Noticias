import React, { useState } from "react";
import { useDispatch } from "react-redux"; // si usas Redux para usuario
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import EditProfile from "./EditProfile";
import "./cpanel.css";

const CPanel = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const closeEditProfile = () => {
    setShowEditProfile(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Si guardas usuario en Redux:
    dispatch({ type: "LOGOUT_USER" }); // asegúrate de tener este action en tu reducer

    // O si guardas usuario en localStorage:
    localStorage.removeItem("user");

    // Redirigir al login
    window.location.href = "/login";
  };

  return (
    <div className="cpanel-container">
      <Topbar
        onEditProfile={handleEditProfile}
        onToggleSidebar={toggleSidebar}
        onLogout={handleLogout}
      />
      <div className="cpanel-body">
        <Sidebar
          activeSection={activeSection}
          onSelect={handleSectionChange}
          sidebarOpen={sidebarOpen}
        />
        <div className="cpanel-content">
          {activeSection === "Dashboard" && <h2>Dashboard</h2>}
          {activeSection === "Noticias" && <h2>Noticias</h2>}
          {activeSection === "Categorías" && <h2>Categorías</h2>}
          {activeSection === "Publicidad" && <h2>Publicidad</h2>}
          {activeSection === "Comentarios" && <h2>Comentarios</h2>}
        </div>
      </div>
      {showEditProfile && <EditProfile onClose={closeEditProfile} />}
    </div>
  );
};

export default CPanel;