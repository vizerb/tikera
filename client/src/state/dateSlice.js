import { createSlice } from "@reduxjs/toolkit";

const getCurrentDay = () => {
  const today = new Date();
  const dayIndex = ((today.getDay() + 6) % 7) + 1;

  return dayIndex;
};

const getCurrentWeek = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

const initialState = {
  week: getCurrentWeek(),
  day: getCurrentDay(),
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDay(state, { payload: day }) {
      state.day = day;
    },
    incrementWeek(state) {
      state.week += 1;
      state.week = Math.min(state.week, 53);
    },
    decrementWeek(state) {
      state.week -= 1;
      state.week = Math.max(state.week, 1);
    },
  },
});

// Selectors
export const selectDay = (state) => state.date.day;
export const selectWeek = (state) => state.date.week;

// Actions
export const { setDay, incrementWeek, decrementWeek } = dateSlice.actions;

export default dateSlice.reducer;
