import { MovieForm } from "./MovieForm";
import { useAddMovieMutation } from "../../state/tikeraApiSlice";
import { toast } from "sonner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMovieModal, selectMovieModal } from "../../state/modalSlice";

function AddMovieModal() {
  const dispatch = useDispatch();

  const isOpen = useSelector(selectMovieModal);
  const [errors, setErrors] = useState();

  const [addMovie] = useAddMovieMutation();

  const handleSubmit = async (movieData) => {
    try {
      await addMovie({
        title: movieData.title,
        description: movieData.description,
        image_path: movieData.image_path,
        duration: movieData.duration,
        genre: movieData.genre,
        release_year: movieData.release_year,
      }).unwrap();

      dispatch(closeMovieModal());

      setErrors({});
      toast.success("Film sikeresen létrehozva.");
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
    <dialog id="addmovie_modal" className={`modal ${isOpen && "modal-open"}`}>
      <div className="modal-box max-h-[94dvh] max-w-2xl bg-base-100 shadow-xl rounded-xl p-8 space-y-6">
        <MovieForm onSubmit={handleSubmit} errors={errors} />
        <button
          onClick={() => dispatch(closeMovieModal())}
          className="btn btn-sm btn-circle btn-ghost text-sm absolute right-2 top-2"
        >
          x
        </button>
      </div>
      <form method="dialog" className="modal-backdrop  h-[100dvh]">
        <button onClick={() => dispatch(closeMovieModal())}>close</button>
      </form>
    </dialog>
  );
}

export default AddMovieModal;
