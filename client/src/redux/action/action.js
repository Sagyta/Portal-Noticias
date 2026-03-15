// actions/action.js
import axios from "axios";
import { 
  LOGIN, LOGOUT, 
  CREATE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORIES, DELETE_CATEGORY,
  CREATE_NEWS, GET_NEWS, UPDATE_NEWS, DELETE_NEWS, GET_NEWS_BY_ID,
  GET_ROLES, CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE,
  GET_AUTHORS, CREATE_AUTHOR, UPDATE_AUTHOR, DELETE_AUTHOR,
  GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER,UPDATE_LOGGED_USER,
  GET_MODIFICATIONS, MARK_AS_READ, CREATE_MODIFICATION,DELETE_USER_MODIFICATIONS,
  GET_COMMENTS,DELETE_COMMENT, 
  GET_ADS_LATERAL, CREATE_ADS_LATERAL, UPDATE_ADS_LATERAL, DELETE_ADS_LATERAL } from "./datatype";

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
// 🔹 OBTENER LAS NOTICIAS X ID
// =========================================
export const getNewsById = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${API_URL}/news/${id}`);

      dispatch({
        type: GET_NEWS_BY_ID,
        payload: res.data,
      });

    } catch (error) {
      console.log(error);
    }
  };
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

// =========================================
// 🔹 TRAER ROLES
// =========================================
export const getRoles = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token"); // 🔹 obtenemos token
      const response = await axios.get(`${API_URL}/role`, {
        headers: { Authorization: `Bearer ${token}` } // 🔹 enviamos token
      });

      dispatch({
        type: GET_ROLES,
        payload: response.data
      });

      console.log("Roles obtenidos:", response.data);
    } catch (error) {
      console.error("Error obteniendo roles:", error.response ? error.response.data : error);
    }
  };
};

// =========================================
// 🔹 CREAR ROL
// =========================================
export const createRole = (data) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/role`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: CREATE_ROLE,
        payload: response.data,
      });
      console.log("Rol creado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creando rol:", error.response ? error.response.data : error);
      throw error;
    }
  };
};

// =========================================
// 🔹 ACTUALIZAR ROL
// =========================================
export const updateRole = (id, data) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/role/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: UPDATE_ROLE,
        payload: response.data,
      });
      console.log("Rol actualizado:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error actualizando rol:", error.response ? error.response.data : error);
      throw error;
    }
  };
};

// =========================================
// 🔹 BORRAR ROL
// =========================================
export const deleteRole = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/role/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: DELETE_ROLE,
        payload: id,
      });
      console.log("Rol borrado:", id);
    } catch (error) {
      console.error("Error borrando rol:", error.response ? error.response.data : error);
      throw error;
    }
  };
};

// ============================
// GET AUTHORS
// ============================
export const getAuthors = () => {
  return async (dispatch) => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/author`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch({
        type: GET_AUTHORS,
        payload: res.data
      });

    } catch (error) {
      console.error("Error obteniendo autores:", error);
    }
  };
};

// ============================
// CREATE AUTHOR
// ============================
export const createAuthor = (data) => {
  return async (dispatch) => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.post(`${API_URL}/author`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch({
        type: CREATE_AUTHOR,
        payload: res.data
      });

    } catch (error) {
      console.error("Error creando autor:", error);
      throw error;
    }
  };
};

// ============================
// EDITAR AUTHORS
// ============================
export const updateAuthor = (id, data) => {
  return async (dispatch) => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.put(`${API_URL}/author/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch({
        type: UPDATE_AUTHOR,
        payload: res.data
      });

    } catch (error) {
      console.error("Error actualizando autor:", error);
      throw error;
    }
  };
};

// ============================
// BORRAR AUTHORS
// ============================
export const deleteAuthor = (id) => {
  return async (dispatch) => {
    try {

      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/author/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch({
        type: DELETE_AUTHOR,
        payload: id
      });

    } catch (error) {
      console.error("Error borrando autor:", error);
      throw error;
    }
  };
};

// ============================
// GET USER
// ============================
export const getUsers = () => {
  return async (dispatch) => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: GET_USERS,
        payload: res.data
      });

    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
    }
  };
};

// ============================
// CREATE USER
// ============================
export const createUser = (userData) => {
  return async (dispatch) => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/user`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch({
        type: CREATE_USER,
        payload: res.data
      });

      return res.data; // 🔴 importante para obtener la password generada

    } catch (error) {

      console.error("Error creando usuario:", error);
      throw error;

    }

  };
};

// ============================
// RESET PASSWORD
// ============================
export const resetUserPassword = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); // 🔹 token definido correctamente

    const res = await fetch(`${API_URL}/user/${id}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Error al resetear la contraseña');

    return data; // Devuelve { message, temporaryPassword }

  } catch (error) {
    console.error(error);
    throw error;
  }
};
// ============================
// EDITAR USER
// ============================
export const updateUser = (id, data) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(`${API_URL}/user/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });

      return res.data; // Devuelve el usuario actualizado
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      throw error;
    }
  };
};

// ============================
// BORRAR USER
// ============================
export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch({
        type: DELETE_USER,
        payload: id
      });

    } catch (error) {
      console.error("Error borrando usuario:", error);
      throw error;
    }
  };
};

// ============================
// EDITAR USER LOGUED
// ============================
export const updateLoggedUser = (user) => {
  return {
    type: UPDATE_LOGGED_USER,
    payload: user,
  };
};

// ============================
// MODIFICATION CREATE
// ============================
export const createModification = (modificationData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_URL}/modification`, modificationData);

      dispatch({
        type: CREATE_MODIFICATION,
        payload: data
      });

    } catch (error) {
      console.error(error);
    }
  };
};
// ============================
// MODIFICATION GET
// ============================
export const getModifications = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${API_URL}/modification`);

      dispatch({
        type: GET_MODIFICATIONS,
        payload: data
      });

    } catch (error) {
      console.error(error);
    }
  };
};

// ============================
// MARK READ DE MODIFICATION
// ============================
export const markAsRead = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(`${API_URL}/modification/${id}/read`);

      dispatch({
        type: MARK_AS_READ,
        payload: data
      });

    } catch (error) {
      console.error(error);
    }
  };
};
// DELETE historial de un usuario
export const deleteUserModifications = (userId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/modification/user/${userId}`);
    dispatch({ type: DELETE_USER_MODIFICATIONS, payload: userId });
  } catch (error) {
    console.error("Error al eliminar notificaciones:", error);
  }
};

// ============================
// COMENTARIOS GET
// ============================
export function getComments(newId){
	return async (dispatch)=>{
		try{
			let url = newId 
			? `${API_URL}/comment?newId=${newId}` 
			: `${API_URL}/comment`;

			let { data } = await axios.get(url);
      console.log("🚀 GET_COMMENTS data:", data) //

			dispatch({
				type: GET_COMMENTS,
				payload: data
			})

		}catch(error){
			console.error("Error al obtener comentario", error)
		}
	}
}

// ============================
// COMENTARIOS DELETE
// ============================
export function deleteComment(id){
	return async (dispatch)=>{
		try{
			await axios.delete(`${API_URL}/comment/${id}`)

			dispatch({
				type: DELETE_COMMENT,
				payload: id
			})

		}catch(error){
			console.error("Error al eliminar comentario", error)
		}
	}
}

// ============================
// ADS LATERAL GET
// ============================
export function get_ads_lateral() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token")
      const { data } = await axios.get(`${API_URL}/adslateral/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log("🚀 GET ADS LATERAL DATA:", data) // 🔹 depuración
      dispatch({ type: GET_ADS_LATERAL, payload: data })
    } catch (error) {
      console.error("Error al obtener ads laterales", error)
    }
  }
}

// ============================
// ADS LATERAL CREATE
// ============================
export function create_ads_lateral(adData) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token")
      const { data } = await axios.post(`${API_URL}/adslateral/`, adData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch({ type: CREATE_ADS_LATERAL, payload: data })
    } catch (error) {
      console.error("Error al crear ads laterales", error)
    }
  }
}

// ============================
// ADS LATERAL EDIT
// ============================
export function update_ads_lateral(id, adData) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token")
      const { data } = await axios.put(`${API_URL}/adslateral/${id}`, adData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch({ type: UPDATE_ADS_LATERAL, payload: data })
    } catch (error) {
      console.error("Error al actualizar ads laterales", error)
    }
  }
}

// ============================
// ADS LATERAL DELETE
// ============================
export function delete_ads_lateral(id) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`${API_URL}/adslateral/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch({ type: DELETE_ADS_LATERAL, payload: id })
    } catch (error) {
      console.error("Error al eliminar ads laterales", error)
    }
  }
}
