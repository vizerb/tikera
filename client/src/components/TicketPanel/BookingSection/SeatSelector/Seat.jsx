function Seat({ state, canBeClicked, onClick }) {
  let stateClass = "bg-base-content/80";
  if (state === "selected") stateClass = "bg-primary";
  else if (state === "booked") stateClass = "bg-base-content/20";

  return (
    <div
      className={`${canBeClicked && "cursor-pointer"}
        md:w-[2.3rem] md:h-[1.78rem] w-[5.8dvw] h-[4.6dvw]
        md:m-[0.07rem] m-[0.2dvw]
        flex flex-col items-center justify-middle
        ${stateClass} 
        `}
      onClick={canBeClicked ? onClick : () => {}}
      style={{
        maskImage: "url(/assets/seat4.webp)",
        maskSize: "contain",
        maskRepeat: "no-repeat",
      }}
    ></div>
  );
}

export default Seat;
