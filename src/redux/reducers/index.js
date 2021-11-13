import { combineReducers } from "redux";
import { categoriesReducer } from "./categoriesReducer";
import { categoryItemsReducer } from "./categoryItemsReducer";
import { categoryReducer } from "./categoryReducer";
import { recentPhotoReducer } from "./recentPhotoReducer";
import { totalProductCountReducer } from "./totalProductCountReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  popularCategories: categoryReducer,
  recentPhotos: recentPhotoReducer,
  allCategories: categoriesReducer,
  totalProductCount: totalProductCountReducer,
  categoryBasedItems: categoryItemsReducer,
});

export default rootReducer;
