// Pages/CPanel/Content.jsx
import React from "react";
import CategoryManager from "./Management/CategoryManager";
import NewsManager from "./Management/NewsManager";
import RoleManager from "./Management/RoleManager";
import AuthorManager from "./Management/AuthorManager";
import UserManager from "./Management/UserManager";
import Dashboard from "./Dashboard";
import "./CPanel.css";

const Content = ({ activeGestion, activeCrear }) => {
  return (
    <div className="content">
      {/* 🔹 Si no hay nada activo mostramos el dashboard */}
      {!activeGestion && !activeCrear && <Dashboard />}

      {/* 🔹 Managers según sección activa */}
      {activeGestion === "Category" || activeCrear === "Category" ? (
        <CategoryManager activeGestion={activeGestion} activeCrear={activeCrear} />
      ) : null}

      {activeGestion === "News" || activeCrear === "News" ? (
        <NewsManager activeGestion={activeGestion} activeCrear={activeCrear} />
      ) : null}

      {activeGestion === "Role" || activeCrear === "Role" ? (
        <RoleManager activeGestion={activeGestion} activeCrear={activeCrear} />
      ) : null}

      {activeGestion === "Author" || activeCrear === "Author" ? (
        <AuthorManager activeGestion={activeGestion} activeCrear={activeCrear} />
      ) : null}

      {activeGestion === "Users" || activeCrear === "Users" ? (
        <UserManager activeGestion={activeGestion} activeCrear={activeCrear} />
      ) : null}
    </div>
  );
};

export default Content;