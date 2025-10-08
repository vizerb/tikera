import { Outlet, useLocation } from "react-router";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { Toaster } from "sonner";
import WeekNavigator from "../components/WeekNavigator";
import { useSelector } from "react-redux";
import { selectTheme } from "../state/themeSlice";

export const Layout = () => {
  const location = useLocation();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <>
      <Toaster
        position="top-center"
        richColors
        className="cursor-grab"
        // theme={theme === "dim" ? "dark" : "light"}
      />

      <div
        className="fixed top-0 left-0 w-full h-screen z-[-1] bg-cover bg-center"
        style={{
          backgroundImage: `url("assets/images/1920x1080dark.webp")`,
          filter: `brightness(${
            theme === "dim" ? "0.65" : "1.5"
          }) saturate(1) hue-rotate(0deg)`,
        }}
      />
      <div className="backdrop-blur-3xl fixed h-screen w-screen" />

      <NavBar />
      <WeekNavigator isActive={location.pathname === "/"} />
      <div className="relative">
        <Outlet />
      </div>
    </>
  );
};
