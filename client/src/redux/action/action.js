// actions/action.js
import axios from "axios";
import { 
  LOGIN, LOGOUT, 
  CREATE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORIES, DELETE_CATEGORY,
  CREATE_NEWS, GET_NEWS, UPDATE_NEWS, DELETE_NEWS, } from "./datatype";

// 🔹 Constante global para la API
const API_URL = process.env.REACT_APP_API_URL;

// LOGIN
export const login = (username, password) => async (dispatch) => {
  try {
    console.log("Iniciando login con:", { username, password });

    const response = await axios.post(`${API_URL}/login`, {
      username,
      password
    });

    console.log("Respuesta completa del back:", response.data);

    // Guardamos datos en localStorage
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);

    // Dispatch al reducer
    dispatch({
      type: LOGIN,
      payload: response.data
    });

    console.log("Login correcto");

  } catch (error) {
    console.error(
      "Error en login:",
      error.response ? error.response.data : error
    );
  }
};

// LOGOUT
export const logout = () => {
  return {
    type: LOGOUT
  };
};

// CATEGORIAS
export const createCategory = (data) => {
  return async (dispatch) => {
    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/category`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch({
        type: CREATE_CATEGORY,
        payload: response.data
      });

      console.log("Categoria creada:", response.data);

    } catch (error) {
      console.error(
        "Error creando categoria:",
        error.response ? error.response.data : error
      );
    }
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const response =await axios.get(`${API_URL}/category`);

      dispatch({
        type: GET_CATEGORIES,
        payload: response.data, //array categorias
      });
    }
    catch (error) {
      console.error("Error al traer categorias", error)
    }
  }
}

// 🔹 ACTUALIZAR CATEGORÍA
export const updateCategory = (id, data) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token"); // 🔹 obtenemos token
      const response = await axios.put(
        `${API_URL}/category/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` } // 🔹 header necesario
        }
      );
      
      dispatch({
        type: UPDATE_CATEGORIES,
        payload: response.data, // enviamos la categoría actualizada
      });

      return response.data; // para poder usar await desde el componente
    } catch (error) {
      console.error("Error actualizando categoría:", error);
      throw error;
    }
  };
};

// DELETE CATEGORY
export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: DELETE_CATEGORY, payload: id });
    } catch (error) {
      console.error("Error borrando categoría:", error);
      throw error;
    }
  };
};

// =========================================
// 🔹 OBTENER TODAS LAS NOTICIAS
// =========================================
export const getNews = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/new`);
    dispatch({ type: GET_NEWS, payload: response.data });
  } catch (error) {
    console.error("Error obteniendo noticias:", error);
    throw error;
  }
};

// =========================================
// 🔹 CREAR NOTICIA
// =========================================
export const createNews = (data, token) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/new`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: CREATE_NEWS, payload: response.data });
    return response.data;
  } catch (error) {
    console.error("Error creando noticia:", error);
    throw error;
  }
};

// =========================================
// 🔹 ACTUALIZAR NOTICIA
// =========================================
export const updateNews = (id, data, token) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/new/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: UPDATE_NEWS, payload: response.data });
    return response.data;
  } catch (error) {
    console.error("Error actualizando noticia:", error);
    throw error;
  }
};

// =========================================
// 🔹 BORRAR NOTICIA
// =========================================
export const deleteNews = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/new/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: DELETE_NEWS, payload: id });
  } catch (error) {
    console.error("Error borrando noticia:", error);
    throw error;
  }
};