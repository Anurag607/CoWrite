import { combineReducers } from "redux";
import sidebarSlice from "./reducers/sidebarSlice";
import searchSlice from "./reducers/searchSlice";
import docSlice from "./reducers/docSlice";
import filterSlice from "./reducers/filterSlice";
import formSlice from "./reducers/formSlice";
import colorSlice from "./reducers/colorSlice";
import alertSlice from "./reducers/alertSlice";
import imgUploadSlice from "./reducers/imgUploadSlice";
import drawerSlice from "./reducers/drawerSlice";
import authSlice from "./reducers/authSlice";
import clientSlice from "./reducers/clientSlice";
import toggleEditor from "./reducers/toggleEditor";
import codeSlice from "./reducers/codeSlice";

export default combineReducers({
  sidebar: sidebarSlice,
  searchBar: searchSlice,
  docs: docSlice,
  filter: filterSlice,
  form: formSlice,
  color: colorSlice,
  alert: alertSlice,
  image: imgUploadSlice,
  drawer: drawerSlice,
  auth: authSlice,
  client: clientSlice,
  toggleEditor: toggleEditor,
  code: codeSlice,
});
