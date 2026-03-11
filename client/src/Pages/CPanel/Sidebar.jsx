import React from "react";

const Sidebar = ({ permissions, activeGestion, activeCrear, onSelectGestion, onSelectCrear }) => {

  return (
    <div className="sidebar">

      {/* Dashboard como botón */}
      <button
        className={`sidebar-item dashboard-btn ${!activeGestion && !activeCrear ? "active" : ""}`}
        onClick={() => {
          onSelectGestion(null);
          onSelectCrear(null);
        }}
      >
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