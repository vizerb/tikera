import MovieCard from "./MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import usePrevious from "../../utils/usePrevious";
import { selectDay } from "../../state/dateSlice";
import { useSelector } from "react-redux";

function MovieSelector({ movies, selectedMovie, selectMovie }) {
  // States
  const currentDay = useSelector(selectDay);
  const prevSelectedMovie = usePrevious(selectedMovie);

  // Refs
  const cardRefs = useRef({});

  // Methods
  const scrollToMovie = useCallback((id) => {
    cardRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Effects
  useEffect(() => {
    if (selectedMovie !== null && prevSelectedMovie !== null) {
      scrollToMovie(selectedMovie?.id);
    }
  }, [scrollToMovie, selectedMovie, prevSelectedMovie]);

  // Helper variables
  const movieSelected = selectedMovie !== null;

  return (
    <div
      className={`${!movieSelected && "gap-1"} flex md:gap-2 grid grid-cols-12`}
      key={currentDay}
    >
      {movies.map((movie) => (
        <motion.div
          key={movie.id}
          ref={(el) => (cardRefs.current[movie.id] = el)}
          className={`
               md:col-span-6 lg:col-span-4 xl:col-span-3
              scroll-mt-23 md:scroll-mt-26
              ${movieSelected ? "col-span-12" : "col-span-6"}`}
          layout={"position"}
          transition={{ duration: 0.4 }}
          onLayoutAnimationComplete={() => {
            if (movie.id === selectedMovie?.id) {
              scrollToMovie(selectedMovie.id);
            }
          }}
        >
          <MovieCard
            key={movie.id}
            movie={movie}
            selectedMovie={selectedMovie}
            selectMovie={selectMovie}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default MovieSelector;
