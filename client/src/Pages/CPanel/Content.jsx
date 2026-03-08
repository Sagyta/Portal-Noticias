// Content.jsx
import React from "react";
import CategoryManager from "./Management/CategoryManager";

const Content = ({ activeGestion, activeCrear }) => {
  return (
    <div style={{ padding: "20px" }}>
      <CategoryManager activeGestion={activeGestion} activeCrear={activeCrear} />
    </div>
  );
};

export default Content;