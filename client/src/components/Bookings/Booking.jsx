import { dayNamesHun } from "../../utils/days";
import ticketTypes, { apiTypeToId } from "../../utils/ticketTypes";

function Booking({ booking }) {
  const getTicketType = (apiTicket) => {
    return ticketTypes.find((t) => t.id === apiTypeToId[apiTicket.type]);
  };

  const price = booking.ticket_types.reduce((accum, apiTicket) => {
    return accum + apiTicket.quantity * getTicketType(apiTicket).price;
  }, 0);

  return (
    <div className="bg-base-300/30 border-2 border-base-content/10 rounded-box shadow-md/20 p-1 w-full h-full">
      <div className="flex items-start justify-between">
        <div className="w-2/3 p-2">
          <h1 className="font-bold text-lg">{booking.screening.movie.title}</h1>
          <h2 className="text-base">
            {dayNamesHun[booking.screening.week_day - 1]}{" "}
            {booking.screening.date}
          </h2>

          <div className="py-1 border-b w-max">
            {booking.ticket_types.map((t) => (
              <p key={t.type}>
                {`${t.quantity}x${getTicketType(t).name} ${
                  t.quantity * getTicketType(t).price
                } Ft`}
              </p>
            ))}
          </div>
          <p className="text-sm font-medium">{price} Ft</p>

          <div className="divider m-0" />

          <div className="grid grid-cols-3">
            {booking.seats.map((s) => (
              <div key={`${s.row} ${s.seat}`} className="text-xs mr-1">
                {s.row}. sor
                <span className="font-bold"> {s.seat}. szék</span>
              </div>
            ))}
          </div>
          <div className="divider m-0" />
        </div>
        <img
          className="m-1 h-55 aspect-5/8
            border object-cover 
             rounded-box"
          src={booking.screening.movie.image_path}
          alt={booking.screening.movie.title}
        />
      </div>
    </div>
  );
}

export default Booking;
