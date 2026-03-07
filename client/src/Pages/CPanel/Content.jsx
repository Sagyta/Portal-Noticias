// src/Pages/CPanel/Content.jsx
import React from "react";

const Content = ({ children }) => {
  return (
    <div style={{ flex: 1, padding: "20px" }}>
      {children || <p>Aquí se renderizará el contenido del panel.</p>}
    </div>
  );
};

export default Content;