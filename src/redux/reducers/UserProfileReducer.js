const initialValue = [];
export const userProfileReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "USER_PROFILE":
      return action.payload;
    default:
      return state;
  }
};
