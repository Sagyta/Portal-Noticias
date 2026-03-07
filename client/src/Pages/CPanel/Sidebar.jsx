import React from "react";

const Sidebar = ({ activeSection, onSelect, sidebarOpen, onClose }) => {
  const sections = ["Dashboard", "Noticias", "Categorías", "Publicidad", "Comentarios"];

  return (
    <div className={`cpanel-sidebar ${sidebarOpen ? "active" : ""}`}>
      {/* Botón cerrar visible solo en móvil */}
      <button className="close-sidebar" onClick={onClose}>
        &times;
      </button>

      {sections.map((section) => (
        <div
          key={section}
          className={`sidebar-item ${activeSection === section ? "sidebar-item-active" : ""}`}
          onClick={() => onSelect(section)}
        >
          {section}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;