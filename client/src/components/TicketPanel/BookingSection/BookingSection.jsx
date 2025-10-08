import { AnimatePresence, motion } from "framer-motion";
import SeatSelector from "./SeatSelector/SeatSelector";
import TicketSelector from "./TicketSelector/TicketSelector";
import { useEffect, useState } from "react";
import ticketTypes from "../../../utils/ticketTypes";
import simpleFade from "../../../utils/simpleFade";
import Finalize from "./Finalize/Finalize";
import FinalizeModal from "./Finalize/FinalizeModal";

function BookingSection({ selectedMovie, selectedScreening }) {
  // States
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [tickets, setTickets] = useState(
    ticketTypes.map(({ id, name, price }) => {
      return { id, name, price, count: 0 };
    })
  );

  // Methods
  const selectSeat = (row, seat) => {
    setSelectedSeats((prev) => [...prev, { row, seat }]);
  };
  const deselectSeat = (row, seat) => {
    setSelectedSeats((prev) =>
      prev.filter((b) => b.row !== row || b.seat !== seat)
    );
  };
  const addTicket = (id, num) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id != id ? t : { ...t, count: Math.max(t.count + num, 0) }
      )
    );
  };

  // Helper variables
  const isActive = selectedScreening != null;
  const ticketCount = tickets.reduce((accum, curr) => accum + curr.count, 0);

  // Effects
  useEffect(() => {
    let newSelectedSeats = [...selectedSeats];
    while (newSelectedSeats.length > ticketCount) {
      newSelectedSeats.pop();
    }
    setSelectedSeats(newSelectedSeats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketCount]);

  useEffect(() => {
    setSelectedSeats([]);
  }, [selectedScreening]);

  return (
    <>
      {isActive && (
        <div className="text-xs rounded-box">
          <TicketSelector tickets={tickets} addTicket={addTicket} />

          <AnimatePresence mode="wait">
            <motion.div key={selectedScreening?.id} {...simpleFade}>
              <SeatSelector
                selectedSeats={selectedSeats}
                ticketCount={ticketCount}
                selectedScreening={selectedScreening}
                addSeat={selectSeat}
                removeSeat={deselectSeat}
              />
              <Finalize
                tickets={tickets}
                selectedSeats={selectedSeats}
              ></Finalize>
              <FinalizeModal
                selectedScreening={selectedScreening}
                tickets={tickets}
                selectedSeats={selectedSeats}
                selectedMovie={selectedMovie}
              ></FinalizeModal>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default BookingSection;
