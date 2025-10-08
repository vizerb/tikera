import { motion, AnimatePresence } from "framer-motion";

function ScreeningSelector({
  selectedMovie,
  selectedScreening,
  selectScreening,
  disableWhenFull = false,
}) {
  //Methods
  const isScreeningFull = (screening) => {
    const allSeats = screening.room.rows * screening.room.seatsPerRow;
    return screening.bookings.length >= allSeats;
  };

  // Helper variables
  const screenings = selectedMovie?.screenings;

  return (
    <div>
      {screenings.map((screening) => (
        <button
          key={screening.id}
          className={`${
            screening.id === selectedScreening?.id
              ? "btn-active shadow-[0_0_0.75rem] shadow-primary/30"
              : "shadow-[0_0_0rem]"
          }
          ${disableWhenFull && isScreeningFull(screening) && "btn-disabled"}
                    btn btn-xs m-1 btn-primary btn-soft
                    transition-all duration-250`}
          onClick={() => selectScreening(screening.id)}
        >
          {screening.start_time}
        </button>
      ))}
    </div>
  );
}

export default ScreeningSelector;
