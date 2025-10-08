import ScreeningForm from "../Screenings/ScreeningForm";
import { useAddScreeningMutation } from "../../state/tikeraApiSlice";
import { toast } from "sonner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeScreeningModal,
  selectScreeningModal,
} from "../../state/modalSlice";

function AddScreeningModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectScreeningModal);
  const [addScreening] = useAddScreeningMutation();
  const [errors, setErrors] = useState();

  const handleSubmit = async (screeningData) => {
    try {
      const createData = {
        movie_id: screeningData.movie_id,
        date: screeningData.date,
        start_time: screeningData.start_time,
      };
      if (screeningData.room_id) {
        createData.room_id = screeningData.room_id;
      }

      await addScreening(createData).unwrap();

      dispatch(closeScreeningModal());
      setErrors({});
      toast.success("Vetítés sikeresen létrehozva.");
    } catch (err) {
      if (err?.data?.errors) {
        setErrors(err.data.errors);
      }
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("Ismeretlen hiba.");
      }
    }
  };

  return (
    <dialog
      id="addscreening_modal"
      className={`modal ${isOpen && "modal-open"}`}
    >
      <div className="modal-box max-h-[94dvh] max-w-2xl bg-base-100 shadow-xl rounded-xl p-8 space-y-6">
        <ScreeningForm onSubmit={handleSubmit} errors={errors} />
        <button
          onClick={() => dispatch(closeScreeningModal())}
          className="btn btn-sm btn-circle btn-ghost text-sm absolute right-2 top-2"
        >
          x
        </button>
      </div>
      <form method="dialog" className="modal-backdrop h-[100dvh]">
        <button onClick={() => dispatch(closeScreeningModal())}>close</button>
      </form>
    </dialog>
  );
}

export default AddScreeningModal;
