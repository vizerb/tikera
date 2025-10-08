import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieModal: false,
  screeningModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openMovieModal: (state) => {
      state.movieModal = true;
    },
    closeMovieModal: (state) => {
      state.movieModal = false;
    },
    openScreeningModal: (state) => {
      state.screeningModal = true;
    },
    closeScreeningModal: (state) => {
      state.screeningModal = false;
    },
  },
});

export const selectMovieModal = (state) => state.modal.movieModal;
export const selectScreeningModal = (state) => state.modal.screeningModal;

export const {
  openMovieModal,
  closeMovieModal,
  openScreeningModal,
  closeScreeningModal,
} = modalSlice.actions;

export default modalSlice.reducer;
