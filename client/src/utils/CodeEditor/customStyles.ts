export const customStyles = {
  control: (styles: any) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    minWidth: "12rem",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "0.9rem",
    fontFamily: "Kanit",
    lineHeight: "1.75rem",
    backgroundColor: "#F7F6F3",
    cursor: "pointer !important",
    border: "none",
    outline: "none",
    boxShadow: "0 4px 6px -1px #262626, 0 2px 4px -2px #262626;",
  }),
  option: (styles: any) => {
    return {
      ...styles,
      color: "#000",
      fontSize: "0.9rem",
      lineHeight: "1.75rem",
      width: "100%",
      background: "#F7F6F3",
      fontFamily: "Kanit",
      fontWeight: 500,
      cursor: "pointer !important",
      ":hover": {
        backgroundColor: "#525252",
        color: "#fff",
        cursor: "pointer",
      },
    };
  },
  menu: (styles: any) => {
    return {
      ...styles,
      backgroundColor: "#fff",
      maxWidth: "14rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer !important",
      boxShadow: "0 4px 6px -1px #262626, 0 2px 4px -2px #262626;",
      overflow: "clip",
      fontFamily: "Unbounded",
    };
  },

  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: "#fff",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      cursor: "pointer !important",
    };
  },
};
