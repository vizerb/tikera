import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { logout, selectUser } from "../state/authSlice";
import { toast } from "sonner";
import { openMovieModal, openScreeningModal } from "../state/modalSlice";
import { useMediaQuery } from "react-responsive";
import ThemeChanger from "./ThemeChanger";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = useLocation().pathname;
  const user = useSelector(selectUser);

  const isMd = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const isAdmin = user && user?.role === "admin";

  let menuItems = [
    {
      name: "Foglalásaim",
      path: "/bookings",
      onClick: () => navigate("/bookings"),
      condition: !isAdmin && user,
    },
    {
      name: "Film hozzáadása",
      path: "/addmovie",
      onClick: () => {
        dispatch(openMovieModal());
      },
      condition: isAdmin,
    },
    {
      name: "Vetítés hozzáadása",
      path: "/addscreening",
      onClick: () => {
        dispatch(openScreeningModal());
      },
      condition: isAdmin,
    },
  ];

  return (
    <div className=" w-full h-12 fixed top-0 left-0 right-0 z-3">
      <div
        className={`
          ${path !== "/" && isMd && "rounded-box"}
            ${isMd && "rounded-t-box"}
           shadow-md flex max-w-7xl mx-auto bg-base-200 h-full items-center
           transition-all duration-500
           `}
      >
        <div className="navbar-start">
          {/* Hamburger */}
          <div
            className={`
            dropdown md:hidden`}
          >
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost scale-x-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-xl dropdown-content bg-base-100 w-max rounded-box p-2 shadow"
            >
              {menuItems.map(
                (item) =>
                  item.condition && (
                    <li key={item.name}>
                      <a
                        className={`${
                          path === item.path &&
                          "bg-primary text-primary-content"
                        }
                          cursor-pointer transition-all duration-300`}
                        onClick={item.onClick}
                      >
                        {item.name}
                      </a>
                    </li>
                  )
              )}
              <li>
                <ThemeChanger />
              </li>
            </ul>
          </div>

          <a
            className="cursor-pointer md:px-4 font-bold text-lg"
            onClick={() => navigate("/")}
          >
            TIKERA
          </a>

          {menuItems.map(
            (item) =>
              item.condition && (
                <a
                  className={`${path === item.path && "underline"}
                  cursor-pointer pl-2 text-md hover:underline
                  md:block hidden`}
                  onClick={item.onClick}
                  key={item.name}
                >
                  {item.name}
                </a>
              )
          )}
        </div>

        <div className="navbar-center">
          {!isMd && user && (
            <p className="text-accent p-0.5 px-2 text-md">{user?.name}</p>
          )}
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              {isMd && (
                <p className="text-accent p-0.5 px-2 text-md">{user?.name}</p>
              )}
              <a
                className="cursor-pointer px-4 pl-3 text-md hover:underline"
                onClick={() => {
                  dispatch(logout());
                  toast.success("Sikeres kijelentkezés");
                }}
              >
                Kijelentkezés
              </a>
            </>
          ) : (
            <>
              <a
                className={`
                  ${path === "/login" && "underline"}
                  cursor-pointer px-0 text-md hover:underline`}
                onClick={() => navigate("/login")}
              >
                Bejelentkezés
              </a>
              <a
                className={`
                  ${path === "/register" && "underline"}
                  cursor-pointer px-4 text-md hover:underline`}
                onClick={() => navigate("/register")}
              >
                Regisztráció
              </a>
            </>
          )}
          {isMd && (
            <div className="pr-4">
              <ThemeChanger />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
