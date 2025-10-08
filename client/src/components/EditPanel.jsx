import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MovieForm } from "./Movies/MovieForm";
import simpleFade from "../utils/simpleFade";
import ScreeningSelector from "./Screenings/ScreeningSelector";
import ScreeningForm from "./Screenings/ScreeningForm";
import {
  useDeleteMovieMutation,
  useDeleteScreeningMutation,
  useUpdateMovieMutation,
  useUpdateScreeningMutation,
} from "../state/tikeraApiSlice";
import { toast } from "sonner";

function EditPanel({ selectedMovie }) {
  // States
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [movieErrors, setMovieErrors] = useState();

  const [updateMovie] = useUpdateMovieMutation();
  const [updateScreening] = useUpdateScreeningMutation();
  const [deleteMovie] = useDeleteMovieMutation();
  const [deleteScreening] = useDeleteScreeningMutation();

  // Effects
  useEffect(() => {
    setSelectedScreening(null);
  }, [selectedMovie]);

  // Methods
  const selectScreening = (id) => {
    setSelectedScreening(screenings.find((screening) => screening.id === id));
  };

  const handleMovieSubmit = async (movieData) => {
    try {
      await updateMovie({
        movieId: selectedMovie.id,
        updateData: {
          title: movieData.title,
          description: movieData.description,
          image_path: movieData.image_path,
          duration: movieData.duration,
          genre: movieData.genre,
          release_year: movieData.release_year,
        },
      }).unwrap();

      setMovieErrors({});
      toast.success("A film sikeresen frissítve lett.");
    } catch (err) {
      if (err?.data?.errors) {
        setMovieErrors(err.data.errors);
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

  const handleScreeningSubmit = async (screeningData) => {
    try {
      let updateData = {
        movie_id: screeningData.movie_id,
        date: screeningData.date,
        start_time: screeningData.start_time,
      };
      if (screeningData.room_id) updateData.room_id = screeningData.room_id;

      await updateScreening({
        screeningId: selectedScreening.id,
        updateData,
      }).unwrap();

      toast.success("A vetítés sikeresen frissítve lett.");
    } catch (err) {
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("Ismeretlen hiba.");
      }
    }
  };

  const handleMovieDelete = async () => {
    try {
      await deleteMovie(selectedMovie.id).unwrap();
      toast.success("A film sikeresen törölve lett.");
    } catch (err) {
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("Ismeretlen hiba.");
      }
    }
  };

  const handleScreeningDelete = async () => {
    try {
      await deleteScreening(selectedScreening.id).unwrap();
      toast.success("A vetítés sikeresen törölve lett.");
    } catch (err) {
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("Ismeretlen hiba.");
      }
    }
  };

  // Helper variables
  const screenings = selectedMovie?.screenings;
  const isActive = selectedMovie !== null;

  return (
    <AnimatePresence>
      {isActive && (
        // Container
        <motion.div
          className="bg-base-300/30 border-2 border-base-content/10 
          rounded-box h-[calc(100dvh-5.75rem)] md:h-[calc(100dvh-7.5rem)]"
          {...simpleFade}
        >
          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              className={`p-2 md:p-4 h-full overflow-scroll overflow-x-hidden`}
              key={selectedMovie?.id}
              {...simpleFade}
              transition={{ duration: 0.3, ease: "circInOut" }}
            >
              <div className="p-2 space-y-6">
                <MovieForm
                  movie={selectedMovie}
                  onSubmit={handleMovieSubmit}
                  errors={movieErrors}
                ></MovieForm>

                <button
                  className="btn btn-error w-full"
                  onClick={handleMovieDelete}
                >
                  Törlés
                </button>
                <ScreeningSelector
                  selectedMovie={selectedMovie}
                  selectedScreening={selectedScreening}
                  selectScreening={selectScreening}
                ></ScreeningSelector>
              </div>
              <div className="divider"></div>

              <motion.div layout={"scale"}>
                {selectedScreening && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      className="p-2 space-y-6"
                      {...simpleFade}
                      transition={{ duration: 0.3, ease: "circInOut" }}
                      key={selectedScreening?.id}
                    >
                      <ScreeningForm
                        givenMovieId={selectedMovie.id}
                        screening={selectedScreening}
                        onSubmit={handleScreeningSubmit}
                      ></ScreeningForm>
                      <button
                        className="btn btn-error w-full"
                        onClick={handleScreeningDelete}
                      >
                        Törlés
                      </button>
                    </motion.div>
                  </AnimatePresence>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EditPanel;
