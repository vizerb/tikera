import { useState, useEffect } from "react";
import { useGetMoviesQuery } from "../../state/tikeraApiSlice";

export const ScreeningForm = ({
  screening,
  onSubmit,
  errors = {},
  givenMovieId,
}) => {
  const { data: movies = [] } = useGetMoviesQuery();

  const defaultMovieId = movies.length > 0 ? movies[0].id : "";

  const [movieId, setMovieId] = useState(givenMovieId || defaultMovieId);
  const [roomId, setRoomId] = useState(screening?.room_id || "");
  const [startTime, setStartTime] = useState(screening?.start_time || "");
  const [date, setDate] = useState(screening?.date || "");

  useEffect(() => {
    setMovieId(givenMovieId || defaultMovieId);
    setRoomId(screening?.room_id || "");
    setStartTime(screening?.start_time || "");
    setDate(screening?.date || "");
  }, [screening, givenMovieId, defaultMovieId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({
      movie_id: movieId,
      room_id: roomId,
      start_time: startTime,
      date: date,
    });
  };

  const rooms = [1, 2];

  return (
    <>
      <h2 className="text-2xl font-bold text-center">
        {screening ? "Vetítés szerkesztése" : "Vetítés hozzáadása"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <select
            className="select select-bordered w-full"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
          >
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
          {errors.movie_id && (
            <p className="text-error text-sm mt-1">{errors.movie_id}</p>
          )}
        </div>

        <div className="form-control">
          <select
            className="select select-bordered w-full"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            <option value={null}>Válassz termet</option>
            {rooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          {errors.room_id && (
            <p className="text-error text-sm mt-1">{errors.room_id}</p>
          )}
        </div>

        <div className="form-control">
          <input
            type="date"
            className="input input-bordered w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && (
            <p className="text-error text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <div className="form-control">
          <input
            type="time"
            className="input input-bordered w-full"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          {errors.start_time && (
            <p className="text-error text-sm mt-1">{errors.start_time}</p>
          )}
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary w-full" type="submit">
            Mentés
          </button>
        </div>
      </form>
    </>
  );
};

export default ScreeningForm;
