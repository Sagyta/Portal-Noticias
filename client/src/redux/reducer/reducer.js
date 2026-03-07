const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("token") || null
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch(type) {

    case "LOGIN":
      console.log("Reducer LOGIN recibido con payload:", payload);
      return {
        ...state,
        user: payload.user,
        token: payload.token
      };

    case "LOGOUT":
      console.log("Reducer LOGOUT ejecutado");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null
      };

    default:
      return state;
  }
};

export default rootReducer;