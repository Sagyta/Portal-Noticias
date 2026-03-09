import React from "react";
import CategoryManager from "./Management/CategoryManager";
import NewsManager from "./Management/NewsManager"; // 🔹 agregamos
import "./CPanel.css";

const Content = ({ activeGestion, activeCrear }) => {
  return (
    <div className="content">
  {activeGestion === "Category" || activeCrear === "Category" ? (
    <CategoryManager activeGestion={activeGestion} activeCrear={activeCrear} />
  ) : null}

  {activeGestion === "News" || activeCrear === "News" ? (
    <NewsManager activeGestion={activeGestion} activeCrear={activeCrear} />
  ) : null}
</div>
  );
};

export default Content;