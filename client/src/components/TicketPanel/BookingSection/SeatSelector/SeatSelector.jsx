import Seat from "./Seat";

function SeatSelector({
  selectedScreening,
  ticketCount,
  selectedSeats,
  addSeat,
  removeSeat,
}) {
  // Methods
  const isBooked = (row, seat) =>
    selectedScreening.bookings.some((b) => b.row === row && b.seat === seat);

  const isSelected = (row, seat) =>
    selectedSeats.some((b) => b.row === row && b.seat === seat);

  const toggleSeat = (row, seat) => {
    return !isSelected(row, seat) ? addSeat(row, seat) : removeSeat(row, seat);
  };

  const getState = (row, seat) => {
    return isBooked(row, seat)
      ? "booked"
      : isSelected(row, seat)
      ? "selected"
      : "";
  };

  const canBeClicked = (row, seat) => {
    return !isBooked(row, seat) && (!allSelected || isSelected(row, seat));
  };

  // Helper variables
  const rows = selectedScreening?.room.rows;
  const cols = selectedScreening?.room.seatsPerRow;
  const allSelected = selectedSeats.length === ticketCount;

  return (
    <div className="flex flex-col py-2 md:py-4">
      {Array.from({ length: rows }).map((_, i) => {
        const row = i + 1;

        return (
          <div key={`${row}`} className="flex mx-auto relative">
            <span className="hidden md:flex text-center absolute  left-[-1rem] top-[0.4rem] text-sm font-medium">
              {row}
            </span>
            {Array.from({ length: cols }).map((_, j) => {
              const col = j + 1;
              return (
                <Seat
                  key={`${row} ${col}`}
                  state={getState(row, col)}
                  canBeClicked={canBeClicked(row, col)}
                  onClick={() => toggleSeat(row, col)}
                ></Seat>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default SeatSelector;
