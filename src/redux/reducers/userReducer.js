const initialValue = {
  role: "",
  email: "",
  token: "",
  isLoggedIn: false,
};

export const userReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...action.payload, isLoggedIn: true };

    case "LOGOUT":
      return { ...action.payload, isLoggedIn: false };

    case "SET_USER":
      return { ...action.payload, isLoggedIn: true };

    default:
      return state;
  }
};
