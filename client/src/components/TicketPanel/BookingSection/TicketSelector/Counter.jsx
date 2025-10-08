function Counter({
  count,
  addCount,
  label = "",
  smallLabel = "",
  weekCounter = false,
}) {
  return (
    <>
      <label htmlFor="counter-input" className="block text-sm">
        <span>{label}</span>
      </label>
      <span className="label mb-1.25">{smallLabel}</span>

      <div
        className={`
            ${!weekCounter && "flex-col"}
        flex md:flex-row items-center`}
      >
        <button
          onClick={() => addCount(-1)}
          className={`
            ${!weekCounter ? "order-3" : "order-1"}
            md:order-1 btn btn-soft btn-xs md:btn-sm md:w-9
            transition-all duration-250`}
        >
          {!weekCounter ? (
            <svg className="w-2 h-2 md:w-3 md:h-3 text-base" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeWidth="2" d="M1 1h16" />
            </svg>
          ) : (
            <span className="text-base">{"<"}</span>
          )}
        </button>
        <span
          id="counter-input"
          className={`order-2 btn btn-primary btn-soft btn-xs md:mx-1 md:btn-sm 
            ${weekCounter ? "md:w-18 w-16" : "md:w-9 w-6.5"}
                    cursor-default
                    transition-all duration-250`}
        >
          {count}
        </span>
        <button
          onClick={() => addCount(1)}
          className={`
            ${!weekCounter ? "order-1" : "order-3"}
            md:order-3 btn btn-soft btn-xs md:btn-sm md:w-9
            transition-all duration-250`}
        >
          {!weekCounter ? (
            <svg
              className="w-2 h-2 md:w-3 md:h-3 text-base"
              viewBox="0 0 18 18"
            >
              <path stroke="currentColor" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          ) : (
            <span className="text-base">{">"}</span>
          )}
        </button>
      </div>
    </>
  );
}

export default Counter;
