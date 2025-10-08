import { useDispatch, useSelector } from "react-redux";
import { dayNamesHun, days } from "../utils/days";
import {
  decrementWeek,
  incrementWeek,
  selectDay,
  selectWeek,
  setDay,
} from "../state/dateSlice";
import Counter from "./TicketPanel/BookingSection/TicketSelector/Counter";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const WeekNavigator = ({ isActive }) => {
  const dispatch = useDispatch();
  const week = useSelector(selectWeek);
  const currentDay = useSelector(selectDay);

  const isMd = useMediaQuery({
    query: "(min-width: 768px)",
  });

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: "3rem", opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full h-11 fixed left-0 top-0 right-0 z-2"
        >
          <div
            className={`
            ${isMd && "rounded-b-box"}
            shadow-md flex w-full bg-base-200 max-w-7xl mx-auto h-full items-center py-2`}
          >
            <div className="navbar-start"></div>
            <div className="navbar-center">
              <Counter
                count={`${week}. hét`}
                addCount={(num) => {
                  if (num >= 1) dispatch(incrementWeek());
                  else dispatch(decrementWeek());
                }}
                weekCounter={true}
              ></Counter>
              <ul className="menu menu-horizontal md:flex hidden">
                {/* <li>2025-06-04</li> */}
                {days.map((day) => (
                  <li key={day}>
                    <a
                      className={`
                    border-1 mx-0.5 transition-all duration-300
                ${
                  day === currentDay ? "bg-primary text-primary-content " : ""
                }`}
                      onClick={() => dispatch(setDay(day))}
                    >
                      {dayNamesHun[day - 1]}
                    </a>
                  </li>
                ))}
                {/* <li>2025-06-13</li> */}
              </ul>
            </div>
            <div className="navbar-end">
              <div className="dropdown dropdown-end md:hidden">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost -scale-x-100"
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
                  className="menu menu-xl dropdown-content bg-base-100 rounded-box mt-3 w-40 p-2 shadow"
                >
                  {days.map((day) => (
                    <li key={day}>
                      <a
                        className={`transition-all duration-300
                ${day === currentDay && "bg-primary text-primary-content"}`}
                        onClick={() => dispatch(setDay(day))}
                      >
                        {dayNamesHun[day - 1]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WeekNavigator;
