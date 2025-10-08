import { motion, AnimatePresence } from "framer-motion";
import ScreeningSelector from "../Screenings/ScreeningSelector";

function MovieDetails({ selectedMovie, selectedScreening, selectScreening }) {
  // Helper variables
  const isActive = selectedMovie !== null;

  return (
    <>
      {isActive && (
        <div className="flex grid-cols-2 gap-4">
          <motion.img
            className="
            border-1 border-secondary object-cover 
            h-65 rounded-box hidden md:block"
            src={selectedMovie.image_path}
            alt={selectedMovie.title}
            initial={{ maxWidth: 0 }}
            animate={{ maxWidth: 175 }}
            exit={{ maxWidth: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />

          <div
            className="xl:w-[calc(0.31*80rem)] xl:min-w-[calc(0.31*80rem)] 
                      lg:w-[27vw] lg:min-w-[27vw] 
                      md:w-[28vw] md:min-w-[28vw]"
          >
            <h1 className="text-xl font-bold">{selectedMovie.title}</h1>
            <div className="text-xs">
              <span className="badge badge-xs badge badge-soft">
                {selectedMovie.release_year}
              </span>
              <span className="badge badge-xs badge badge-soft mx-1">
                {selectedMovie.genre}
              </span>
              <span className="badge badge-xs badge badge-soft">
                {selectedMovie.duration} perc
              </span>
            </div>
            <p className="text-sm py-4">{selectedMovie.description}</p>
            <ScreeningSelector
              selectedMovie={selectedMovie}
              selectedScreening={selectedScreening}
              selectScreening={selectScreening}
              disableWhenFull={true}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
