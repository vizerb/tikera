import { createSlice } from "@reduxjs/toolkit";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultTheme = prefersDark ? "dim" : "dimlight";

const initialState = {
  theme: localStorage.getItem("theme") || defaultTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, { payload: theme }) => {
      state.theme = theme;
      localStorage.setItem("theme", theme);
    },
  },
});

// selectors
export const selectTheme = (state) => state.theme.theme;

// actions
export const { setTheme } = themeSlice.actions;

// reducer
export default themeSlice.reducer;
