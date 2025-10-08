import { useGetBookingsQuery } from "../../state/tikeraApiSlice";
import Booking from "./Booking";

function Bookings() {
  // Queries
  const { data: bookings = [] } = useGetBookingsQuery();

  return (
    <div className="container mx-auto h-full min-h-[100dvh] max-w-7xl">
      <div className="grid md:grid-cols-2 gap-2 xl:grid-cols-3 pt-15 xl:px-0 py-3 px-2">
        {bookings.map((booking) => (
          <Booking key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}

export default Bookings;
