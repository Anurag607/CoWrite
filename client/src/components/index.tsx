"use client";

import dynamic from "next/dynamic";
import ErrorBoundaryWrapper from "./ErrorBoundary";
import LoaderSkeleton from "./LoadingUI";
import ScrollToTop from "./ScrollToTop";
import DarkMode from "./DarkMode";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Search from "./Search";
import Filter from "./Filter";
import AddFormPopup from "./Forms/add_form";
import UpdateFormPopup from "./Forms/update_form";
import FAB from "./FAB";
import Pagination from "./Pagination";
import ColorPopup from "./ColorPopup";
import Alert from "./Alert";
import LoadingSpinner from "./LoadingSpinner";
import OffCanvasPopup from "./OffCanvasPopup";

const Editor = dynamic<{
  editorRef: any;
  children?: any;
  data: any;
}>(() => import("./Editor") as any, {
  ssr: false,
});

export {
  ErrorBoundaryWrapper,
  LoaderSkeleton,
  ScrollToTop,
  DarkMode,
  Footer,
  Navbar,
  Sidebar,
  Search,
  Filter,
  AddFormPopup,
  UpdateFormPopup,
  FAB,
  Pagination,
  ColorPopup,
  Alert,
  LoadingSpinner,
  OffCanvasPopup,
  Editor,
};
