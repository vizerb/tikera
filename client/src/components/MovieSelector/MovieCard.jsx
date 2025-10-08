const MovieCard = ({ movie, selectedMovie, selectMovie }) => {
  const isSelected = movie.id === selectedMovie?.id;
  const anyMovieSelected = selectedMovie !== null;
  const layoutShiftFix =
    "max-h-[50dvw] xl:max-h-[calc(0.195*80rem)] lg:max-h-[26dvw] md:max-h-[28.8dvw]";

  return (
    <div
      className={`${
        isSelected
          ? "shadow-[0_0_1rem] shadow-primary/30 border-4 border-primary bg-base-300 rounded-box"
          : "rounded-box shadow-lg/30"
      }
      card card-border card-xs ${layoutShiftFix}
      h-full w-full border-base-300 cursor-pointer bg-base-100 overflow-hidden
      group hover:bg-base-300 transition-all duration-200 ease-out`}
      onClick={() => (isSelected ? {} : selectMovie(movie.id))}
    >
      <figure
        className={`${isSelected && "border-base-300"}
          aspect-4/5 md:border-3 border-2 border-base-100 rounded-box
          group-hover:border-base-300 transition-all duration-200 ease-out`}
      >
        <img
          className="object-cover w-full h-full"
          src={movie.image_path}
          alt={movie.title}
        />
      </figure>
      <div
        className={`
      ${anyMovieSelected ? "pt-0" : "pt-1"}
        flex flex-col justify-between card-body px-1 h-17 md:h-15 md:pt-1 md:px-2`}
      >
        <h2 className="card-title text-xs/3">{movie.title}</h2>
        <div
          className={`
            ${anyMovieSelected ? "flex-col" : "space-x-2 flex-row"}
            md:space-x-2 md:text-xs md:flex-row
            text-[0.6rem]/2.5 flex items-start`}
        >
          <span className="flex">{movie.genre}</span>
          <span className="flex">{movie.duration} perc</span>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
