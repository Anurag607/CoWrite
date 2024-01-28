import { combineReducers } from "redux";
import menuSlice from "./reducers/menuSlice";
import sidebarSlice from "./reducers/sidebarSlice";
import searchSlice from "./reducers/searchSlice";
import docSlice from "./reducers/docSlice";
import filterSlice from "./reducers/filterSlice";
import formSlice from "./reducers/formSlice";
import colorSlice from "./reducers/colorSlice";
import alertSlice from "./reducers/alertSlice";
import imgUploadSlice from "./reducers/imgUploadSlice";
import docContentSlice from "./reducers/docContentSlice";
import drawerSlice from "./reducers/drawerSlice";
import darkModeSlice from "./reducers/darkModeSlice";
import editorImgSlice from "./reducers/editorImgSlice";
import editorSlice from "./reducers/editorSlice";
import authSlice from "./reducers/authSlice";
import clientSlice from "./reducers/clientSlice";
import toggleEditor from "./reducers/toggleEditor";

export default combineReducers({
  menu: menuSlice,
  sidebar: sidebarSlice,
  searchBar: searchSlice,
  docs: docSlice,
  filter: filterSlice,
  form: formSlice,
  color: colorSlice,
  alert: alertSlice,
  image: imgUploadSlice,
  docContent: docContentSlice,
  drawer: drawerSlice,
  darkMode: darkModeSlice,
  editorImage: editorImgSlice,
  editor: editorSlice,
  auth: authSlice,
  client: clientSlice,
  toggleEditor: toggleEditor,
});
