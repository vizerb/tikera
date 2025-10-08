import { useEffect, useState } from "react";
import MovieSelector from "./MovieSelector/MovieSelector";
import TicketPanel from "./TicketPanel/TicketPanel";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import {
  useGetMoviesOnWeekQuery,
  useGetMoviesQuery,
} from "../state/tikeraApiSlice";
import { selectDay, selectWeek } from "../state/dateSlice";
import EditPanel from "./EditPanel";
import { selectUser } from "../state/authSlice";
import { dayNames } from "../utils/days";

const compareTimes = (a, b) => {
  const [aHours, aMinutes] = a.start_time.split(":").map(Number);
  const [bHours, bMinutes] = b.start_time.split(":").map(Number);

  const aTotal = aHours * 60 + aMinutes;
  const bTotal = bHours * 60 + bMinutes;

  return aTotal - bTotal;
};

function MovieListings() {
  // States
  const week = useSelector(selectWeek);
  const day = useSelector(selectDay);
  const user = useSelector(selectUser);
  const isAdmin = user?.role === "admin";

  const { data: moviesOnWeek = [] } = useGetMoviesOnWeekQuery(week);
  const { data: allMovies = [] } = useGetMoviesQuery();

  // For admins show the movies that don't have a screening
  // on the given day so that they can be edited
  let movies = isAdmin ? allMovies : moviesOnWeek;
  movies = movies.map((movie) => ({
    ...movie,
    screenings: movie.screenings.filter(
      (screening) =>
        screening.week_number == week &&
        (screening.week_day === day || screening.week_day === dayNames[day - 1])
    ),
  }));
  if (!isAdmin) {
    movies = movies.filter((movie) => movie.screenings.length != 0);
  }

  const [selectedMovie, setSelectedMovie] = useState(null);

  // Methods
  const selectMovie = (id) => {
    let movie = movies.find((movie) => movie.id === id);
    movie.screenings.sort(compareTimes);

    setSelectedMovie(movie);
  };

  // Effects
  useEffect(() => {
    setSelectedMovie(null);
  }, [moviesOnWeek, week, day]);

  // Media query
  const isMd = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const isLg = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  // Helper variables
  let width = 28.5;
  if (isLg) width = 50;
  else if (isMd) width = 40;
  const movieSelected = selectedMovie !== null;

  return (
    <div className="container mx-auto h-full min-h-[100vh] max-w-7xl">
      <div className={`flex pt-23`}>
        <motion.div
          className={`${
            movieSelected ? "mx-0" : "mx-auto"
          } md:p-4 md:pt-3 md:pl-2 xl:pl-0`}
          initial={{ width: "80%" }}
          animate={{ width: movieSelected ? `${width}%` : "80%" }}
          transition={{ duration: 0.3 }}
        >
          <MovieSelector
            movies={movies}
            selectedMovie={selectedMovie}
            selectMovie={selectMovie}
          ></MovieSelector>
        </motion.div>
        <div
          className={`
          top-23 md:py-3 md:pr-2 xl:pr-0 w-[71.5%] md:w-[60%] lg:w-[50%] max-w-160 fixed right-0 xl:[right:calc((100dvw-80rem)/2)]`}
        >
          {isAdmin ? (
            <EditPanel selectedMovie={selectedMovie}></EditPanel>
          ) : (
            <TicketPanel selectedMovie={selectedMovie}></TicketPanel>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieListings;
