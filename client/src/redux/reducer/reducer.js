import { 
  LOGIN, LOGOUT, 
  CREATE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORIES, DELETE_CATEGORY,
  CREATE_NEWS, GET_NEWS, UPDATE_NEWS, DELETE_NEWS,
  GET_ROLES, CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE,
  GET_AUTHORS, CREATE_AUTHOR, UPDATE_AUTHOR, DELETE_AUTHOR,
  GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER, UPDATE_LOGGED_USER } from "../action/datatype";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token") || null,
  categories: [],
  news: [],
  roles: [],
  authors: [],
  users: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case LOGIN:
     // console.log("Reducer LOGIN recibido con payload:", payload);
      return {
        ...state,
        user: payload.user,
        token: payload.token
      };

    case LOGOUT:
     // console.log("Reducer LOGOUT ejecutado");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null
      };

    case CREATE_CATEGORY:
      console.log("Reducer CREATE_CATEGORY:", payload);
      return {
        ...state,
        categories: [...state.categories, payload]
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload
      };
    
    case UPDATE_CATEGORIES:
      console.log("Reducer update categories", payload);
      return {
        ...state,
        categories: state.categories.map(cat =>
          cat.id === payload.id ? payload : cat)
      };
    
    case DELETE_CATEGORY:
      return {
         ...state,
         categories: state.categories.filter(cat => cat.id !== payload),
       };

    case GET_NEWS:
      return { ...state, news: payload };
    
    case CREATE_NEWS:
      return { ...state, news: [...state.news, payload] };
    
    case UPDATE_NEWS:
      return {
       ...state,
      news: state.news.map((item) =>
      item.id === payload.id ? payload : item
         ),
       };
    
    case DELETE_NEWS:
       return {
        ...state,
       news: state.news.filter((item) => item.id !== payload),
      };
        
    case GET_ROLES:
      return { ...state, roles: payload };
        
    case CREATE_ROLE:
      return { ...state, roles: [...state.roles, payload] };
        
    case UPDATE_ROLE:
      return {
        ...state,
        roles: state.roles.map((r) => (r.id === payload.id ? payload : r)),
      };
       
    case DELETE_ROLE:
      return {
      ...state,
      roles: state.roles.filter((r) => r.id !== payload),
      };
          
    case GET_AUTHORS:
      return {
        ...state,
        authors: payload
        };
            
    case CREATE_AUTHOR:
      return {
        ...state,
        authors: [...state.authors, payload]
      };

    case UPDATE_AUTHOR:
      return {
        ...state,
        authors: state.authors.map(a =>
          a.id === payload.id ? payload : a
          )
        };
          
    case DELETE_AUTHOR:
        return {
          ...state,
          authors: state.authors.filter(a => a.id !== payload)
        };
    
    case GET_USERS:
        return {
        ...state,
        users: payload
        };
                    
    case CREATE_USER:
        return {
        ...state,
        users: [...state.users, payload]
        };
    
    case UPDATE_USER:
        return {
          ...state,
          users: state.users.map(u => u.id === payload.id ? payload : u)
        };
        
    case DELETE_USER:
        return {
          ...state,
          users: state.users.filter(u => u.id !== payload)
        };
// --- Actualizar usuario logueado ---
    case UPDATE_LOGGED_USER:
        return { ...state, user: payload };    

    default:
      return state;
  }
};

export default rootReducer;