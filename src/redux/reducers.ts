import { combineReducers } from "redux";
import menuSlice from "./reducers/menuSlice";
import sidebarSlice from "./reducers/sidebarSlice";
import searchSlice from "./reducers/searchSlice";
import noteSlice from "./reducers/noteSlice";
import filterSlice from "./reducers/filterSlice";
import formSlice from "./reducers/formSlice";
import colorSlice from "./reducers/colorSlice";
import alertSlice from "./reducers/alertSlice";
import imgUploadSlice from "./reducers/imgUploadSlice";

export default combineReducers({
  menu: menuSlice,
  sidebar: sidebarSlice,
  searchBar: searchSlice,
  notes: noteSlice,
  filter: filterSlice,
  form: formSlice,
  color: colorSlice,
  alert: alertSlice,
  image: imgUploadSlice,
});
