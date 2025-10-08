import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingSection from "./BookingSection/BookingSection";
import MovieDetails from "./MovieDetails";
import simpleFade from "../../utils/simpleFade";

function TicketPanel({ selectedMovie }) {
  // States
  const [selectedScreening, setSelectedScreening] = useState(null);

  // Effects
  useEffect(() => {
    setSelectedScreening(null);
  }, [selectedMovie]);

  // Methods
  const selectScreening = (id) => {
    setSelectedScreening(screenings.find((screening) => screening.id === id));
  };

  // Helper variables
  const screenings = selectedMovie?.screenings;
  const isActive = selectedMovie !== null;

  return (
    <AnimatePresence>
      {isActive && (
        // Container
        <motion.div
          className="bg-base-300/30 border-2 border-base-content/10 
          rounded-box h-[calc(100dvh-5.75rem)] md:h-[calc(100dvh-7.5rem)]
          overflow-scroll overflow-x-hidden"
          {...simpleFade}
        >
          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              className={`p-2 md:p-4 h-full `}
              key={selectedMovie?.id}
              {...simpleFade}
            >
              <MovieDetails
                selectedMovie={selectedMovie}
                selectedScreening={selectedScreening}
                selectScreening={selectScreening}
              ></MovieDetails>

              <motion.div
                className="divider"
                key={selectedMovie?.id + 1}
                initial={{ maxWidth: 0 }}
                animate={{ maxWidth: 600 }}
                exit={{ maxWidth: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              ></motion.div>

              <motion.div layout={"scale"}>
                <BookingSection
                  selectedMovie={selectedMovie}
                  selectedScreening={selectedScreening}
                ></BookingSection>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TicketPanel;
