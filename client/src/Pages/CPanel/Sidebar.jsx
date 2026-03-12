import React from "react";
import { FaHome, FaNewspaper, FaFolder, FaComment, FaUserEdit, FaUsers, FaKey, FaBullhorn, FaImages } from "react-icons/fa";

const Sidebar = ({ permissions, activeGestion, activeCrear, onSelectGestion, onSelectCrear }) => {

  // Mapa de iconos por item
  const iconsMap = {
    Dashboard: <FaHome />,
  News: <FaNewspaper />,
  Category: <FaFolder />,
  Comments: <FaComment />,
  Author: <FaUserEdit />,
  Users: <FaUsers />,
  Role: <FaKey />,
  "Ads Banner": <FaBullhorn />,
  "Ads Lateral": <FaImages />
  };

  return (
    <div className="sidebar">

      {/* Dashboard como título especial */}
      <button
        className={`sidebar-item dashboard-btn ${!activeGestion && !activeCrear ? "active" : ""}`}
        onClick={() => {
          onSelectGestion(null);
          onSelectCrear(null);
        }}
      >
        <span className="sidebar-icon">{iconsMap["Dashboard"]}</span>
        CPanel
      </button>

      {/* Secciones Gestión y Crear */}
      {["Gestión", "Crear"].map((group, idx) => {
        const items = permissions[group] || [];

        return (
          <div key={idx} className="sidebar-section">
            <div className="sidebar-title">{group}</div>

            {items.map(item => {
              const isActive = group === "Gestión"
                ? activeGestion === item
                : activeCrear === item;

              const handleClick = () => {
                if (group === "Gestión") {
                  onSelectGestion(item);
                  onSelectCrear(null);
                } else {
                  onSelectCrear(item);
                  onSelectGestion(null);
                }
              };

              return (
                <button
                  key={item}
                  className={`sidebar-item ${isActive ? "active" : ""}`}
                  onClick={handleClick}
                >
                  <span className="sidebar-icon">{iconsMap[item]}</span>
                  {item}
                </button>
              );
            })}
          </div>
        );
      })}

    </div>
  );
};

export default Sidebar;