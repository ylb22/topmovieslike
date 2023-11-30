import { Outlet } from "react-router";
import Header from "./Header";
import HeaderTwo from "./HeaderTwo";
import { useState } from "react";

function AppLayout({ theme, setThemeMode, currentPage }) {
  const [disabledMenu, setDisabledMenu] = useState(true);

  const toggleMenu = () => {
    disabledMenu ? setDisabledMenu(false) : setDisabledMenu(true);
  };

  return (
    <div>
      <Header
        disabledMenu={disabledMenu}
        setDisabledMenu={setDisabledMenu}
        theme={theme}
        currentPage={currentPage}
      />
      <HeaderTwo
        toggleMenu={toggleMenu}
        disabledMenu={disabledMenu}
        theme={theme}
        setThemeMode={setThemeMode}
      />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
