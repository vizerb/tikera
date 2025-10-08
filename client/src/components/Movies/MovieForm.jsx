import { useEffect, useState } from "react";

export const MovieForm = ({ movie, onSubmit, errors = {} }) => {
  const [title, setTitle] = useState(movie?.title || "");
  const [description, setDescription] = useState(movie?.description || "");
  const [imagePath, setImagePath] = useState(movie?.image_path || "");
  const [duration, setDuration] = useState(movie?.duration || "");
  const [genre, setGenre] = useState(movie?.genre || "");
  const [releaseYear, setReleaseYear] = useState(movie?.release_year || "");

  useEffect(() => {
    setTitle(movie?.title || "");
    setDescription(movie?.description || "");
    setImagePath(movie?.image_path || "");
    setDuration(movie?.duration || "");
    setGenre(movie?.genre || "");
    setReleaseYear(movie?.release_year || "");
  }, [movie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({
      title,
      description,
      image_path: imagePath,
      duration,
      genre,
      release_year: releaseYear,
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center">
        {movie ? "Film szerkesztése" : "Film hozzáadása"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <input
            type="text"
            placeholder="Cím"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="text-error text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="form-control">
          <textarea
            placeholder="Leírás"
            className="textarea textarea-bordered w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className="text-error text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div className="form-control">
          <input
            type="url"
            placeholder="Kép URL"
            className="input input-bordered w-full"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
          />
          {errors.image_path && (
            <p className="text-error text-sm mt-1">{errors.image_path}</p>
          )}
        </div>

        <div className="form-control">
          <input
            type="number"
            placeholder="Hossz (percben)"
            className="input input-bordered w-full"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          {errors.duration && (
            <p className="text-error text-sm mt-1">{errors.duration}</p>
          )}
        </div>

        <div className="form-control">
          <input
            type="text"
            placeholder="Műfaj"
            className="input input-bordered w-full"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          {errors.genre && (
            <p className="text-error text-sm mt-1">{errors.genre}</p>
          )}
        </div>

        <div className="form-control">
          <input
            type="number"
            placeholder="Megjelenés éve"
            className="input input-bordered w-full"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
          {errors.release_year && (
            <p className="text-error text-sm mt-1">{errors.release_year}</p>
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
