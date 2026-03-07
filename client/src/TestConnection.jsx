import React, { useEffect } from "react";
import axios from "axios";

const TestConnection = () => {
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios.get(`${apiUrl}/news`)
      .then(res => console.log("Conexión exitosa, noticias:", res.data))
      .catch(err => console.error("Error conectando con backend:", err));
  }, []);

  return <div>Probando conexión con el backend… Revisa la consola</div>;
};

export default TestConnection;