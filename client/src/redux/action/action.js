// actions/action.js
import axios from "axios";
import { LOGIN } from "./datatype"; // importamos el datatype

export const login = (username, password) => async (dispatch) => {
  try {
    console.log("Iniciando login con:", { username, password });

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { username, password });
    
    console.log("Respuesta completa del back:", response.data);

    // Guardamos los datos en localStorage
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);

    console.log("Datos guardados en localStorage:", {
      user: response.data.user,
      token: response.data.token
    });

    // Dispatch al reducer usando el datatype
    console.log("Dispatch LOGIN con type:", LOGIN);
    dispatch({
      type: LOGIN,
      payload: response.data
    });

    console.log("Dispatch realizado, redirigiendo al cpanel...");
    
    // Redirigimos al cpanel
   // window.location.href = "/cpanel"; 

  } catch (error) {
    console.error("Error en login:", error.response ? error.response.data : error);
  }
};