import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.setItem("token", null);
      localStorage.setItem("user", null);
    },
  },
});

// selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

// actions
export const { login, logout } = authSlice.actions;

// reducer
export default authSlice.reducer;
