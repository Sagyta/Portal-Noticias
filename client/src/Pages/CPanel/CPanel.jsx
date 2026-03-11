import React, { useState } from "react";
import { useSelector } from "react-redux";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import "./CPanel.css";

const CPanel = () => {
  const [activeGestion, setActiveGestion] = useState(null);
  const [activeCrear, setActiveCrear] = useState(null);

  const user = useSelector(state => state.user);

  if (!user) return <p>No hay usuario logueado</p>;

  // Objeto mínimo de permisos por rol
  const rolePermissions = {
    1: {
      Gestión: ["News","Category","Comments","Author","Users","Role","Ads Banner","Ads Lateral"],
      Crear: ["News","Category","Author","Users","Role","Ads Banner","Ads Lateral"]
    },
    2: {
      Gestión: ["News","Category","Comments","Ads Banner","Ads Lateral"],
      Crear: ["News","Category","Ads Banner","Ads Lateral"]
    },
    3: {
      Gestión: ["Comments","Ads Banner","Ads Lateral"],
      Crear: ["Ads Banner","Ads Lateral"]
    }
  };

  const permissions = rolePermissions[user.roleId || 1] || {};

  return (
    <div className="cpanel-container">
      <Topbar user={user} />

      <div className="cpanel-body">
        <Sidebar
          permissions={permissions}
          activeGestion={activeGestion}
          activeCrear={activeCrear}
          onSelectGestion={setActiveGestion}
          onSelectCrear={setActiveCrear}
        />
        <Content
          activeGestion={activeGestion}
          activeCrear={activeCrear}
          
        />
      </div>
    </div>
  );
};

export default CPanel;