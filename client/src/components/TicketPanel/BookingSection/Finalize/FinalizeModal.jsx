import { dayNamesHun } from "../../../../utils/days";
import { useAddBookingMutation } from "../../../../state/tikeraApiSlice";
import { idToApiType } from "../../../../utils/ticketTypes";
import { toast } from "sonner";

function FinalizeModal({
  selectedScreening,
  tickets,
  selectedSeats,
  selectedMovie,
}) {
  // States
  const [addBooking] = useAddBookingMutation();

  const handleResult = (result) => {
    if (result?.status === "success") {
      toast.success("Sikeres foglalás!");
    } else if (result?.data?.message) {
      toast.error(result.data.message || "Hiba történt a foglalás során.");
    } else if (result?.message) {
      toast.error(result.message);
    } else {
      toast.error("Ismeretlen hiba.");
    }
  };

  // Methods
  const onClick = async (e) => {
    try {
      const result = await addBooking({
        screening_id: selectedScreening.id,
        seats: selectedSeats.map(({ row, seat }) => ({ row, number: seat })),
        ticket_types: tickets
          .filter((t) => t.count != 0)
          .map(({ count, id }) => ({
            type: idToApiType[id],
            quantity: count,
          })),
      }).unwrap();

      handleResult(result);
    } catch (err) {
      handleResult(err);
    }
  };

  // Helper variables
  const price = tickets.reduce(
    (accum, curr) => accum + curr.count * curr.price,
    0
  );

  return (
    <dialog id="finalize_modal" className="modal">
      <div className="modal-box">
        <h1 className="font-bold text-lg">{selectedMovie.title}</h1>
        <h2 className="text-base">
          {dayNamesHun[selectedScreening.week_day - 1]} {selectedScreening.date}
        </h2>
        <div className="flex grid-cols-2 items-end">
          <div className="w-2/3 py-2">
            <div className="py-1 border-b w-max">
              {tickets.map((t) => (
                <p key={t.id}>
                  {t.count !== 0
                    ? `${t.count}x${t.name} ${t.count * t.price} Ft`
                    : ""}
                </p>
              ))}
            </div>
            <p className="text-sm font-medium">{price} Ft</p>

            <div className="divider m-0" />

            <div className="grid grid-cols-3">
              {selectedSeats.map((s) => (
                <div key={`${s.row} ${s.seat}`} className="text-xs mr-2">
                  {s.row}. sor {s.seat}. szék
                </div>
              ))}
            </div>
            <div className="divider m-0" />
          </div>

          <div className="flex grow justify-end">
            <form method="dialog">
              <button
                className="btn btn-primary shadow-[0_0_2rem] shadow-primary/0 hover:shadow-primary/30 transition-shadow duration-400"
                onClick={onClick}
              >
                Véglegesítés
              </button>

              <button className="btn btn-sm btn-circle btn-ghost text-sm absolute right-2 top-2">
                x
              </button>
            </form>
          </div>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button className="cursor-wait">close</button>
      </form>
    </dialog>
  );
}

export default FinalizeModal;
