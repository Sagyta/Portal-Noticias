import React from "react";

const Sidebar = ({ permissions, activeGestion, activeCrear, onSelectGestion, onSelectCrear }) => {
  const sections = [
    { group: "Dashboard", items: [] },
    { group: "Gestión", items: [] }, // items vienen de permissions
    { group: "Crear", items: [] }
  ];

  return (
    <div className="sidebar">
      {sections.map((section, idx) => {
        const items = permissions[section.group] || [];

        return (
          <div key={idx} className="sidebar-section">
            <div className="sidebar-title">{section.group}</div>

            {items.map(item => {
              // Estado activo independiente por grupo
              const isActive = section.group === "Gestión"
                ? activeGestion === item
                : activeCrear === item;

              const handleClick = () => {
                // Activar solo este grupo, desactivar el otro
                if (section.group === "Gestión") {
                  onSelectGestion(item);
                  onSelectCrear(null); // desactiva Crear
                } else {
                  onSelectCrear(item);
                  onSelectGestion(null); // desactiva Gestión
                }
              };

              return (
                <button
                  key={item}
                  className={`sidebar-item ${isActive ? "active" : ""}`}
                  onClick={handleClick}
                >
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