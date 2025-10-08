import { useSelector } from "react-redux";
import { toast } from "sonner";
import { selectUser } from "../../../../state/authSlice";

function Finalize({ tickets, selectedSeats }) {
  // Helper variables
  const ticketCount = tickets.reduce((accum, curr) => accum + curr.count, 0);
  const allSelected = selectedSeats.length === ticketCount && ticketCount !== 0;
  const user = useSelector(selectUser);

  const onClick = () => {
    if (user) {
      document.getElementById("finalize_modal").showModal();
    } else {
      toast.error("A jegyfoglaláshoz be kell jelentkezned!");
    }
  };

  return (
    <div className="flex justify-center py-4">
      <button
        className={`${
          allSelected ? "shadow-[0_0_2rem] shadow-primary/0" : "btn-disabled"
        }
            btn btn-lg btn-primary hover:shadow-primary/30
            transition-all duration-400`}
        onClick={onClick}
      >
        Foglalás véglegesítése
      </button>
    </div>
  );
}

export default Finalize;
