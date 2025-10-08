import Counter from "./Counter";
import ticketTypes from "../../../../utils/ticketTypes";

function TicketSelector({ tickets, addTicket }) {
  const price = tickets.reduce(
    (accum, curr) => accum + curr.count * curr.price,
    0
  );

  return (
    <div className="flex-cols w-[60dvw] md:px-0 md:w-96 mx-auto">
      <div className="flex justify-between">
        {ticketTypes.map((tt) => (
          <div key={tt.id}>
            <Counter
              label={tt.name}
              smallLabel={tt.price + " Ft"}
              count={tickets.find((t) => t.id == tt.id).count}
              addCount={(num) => addTicket(tt.id, num)}
            ></Counter>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="text-xs">
          <span className="label">Összesen: {price} Ft</span>
        </div>
      </div>
    </div>
  );
}

export default TicketSelector;
