import React from "react";
import styles from "./DarkMode.module.css";
import classNames from "classnames";

let prefersDark = false;

const DarkMode = () => {
  const [theme, setTheme] = React.useState("light");

  const setDark = () => {
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    document.documentElement.setAttribute("data-theme", "light");
  };

  if (typeof window !== "undefined") {
    prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  const defaultDark = theme === "dark" || (theme === null && prefersDark);

  if (defaultDark) {
    setDark();
  }

  const toggleTheme = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.currentTarget.dataset.theme === "light") {
      setDark();
    } else {
      setLight();
    }
  };

  return (
    <div
      className={classNames({
        [styles.darkMode]: true,
        "p-1 rounded-lg": true,
        "mobile:mb-0 bg-white dark:bg-transparent": true,
        "shadow-[0.5px_1.25px_4px_0_rgba(0,0,0,0.2)] dark:shadow-[0.5px_1.25px_4px_0_rgba(0,0,0,0.8)]":
          true,
      })}
      data-theme={theme}
      onClick={(event) => {
        setTheme((currentTheme) =>
          currentTheme === "light" ? "dark" : "light"
        );
        toggleTheme(event);
      }}
    >
      <img
        src={`${theme === "light" ? "/dark-mode.png" : "/moon.png"}`}
        alt={"switch"}
        className={classNames({
          "w-7 h-7": true,
          "!cursor-pointer": true,
        })}
      />
    </div>
  );
};

export default DarkMode;
