import { 
  LOGIN, LOGOUT, 
  CREATE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORIES, DELETE_CATEGORY,
  CREATE_NEWS, GET_NEWS, UPDATE_NEWS, DELETE_NEWS, } from "../action/datatype";

const initialState = {
  news: [],
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token") || null,
  categories: []
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case LOGIN:
      console.log("Reducer LOGIN recibido con payload:", payload);
      return {
        ...state,
        user: payload.user,
        token: payload.token
      };

    case LOGOUT:
      console.log("Reducer LOGOUT ejecutado");
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

    default:
      return state;
  }
};

export default rootReducer;