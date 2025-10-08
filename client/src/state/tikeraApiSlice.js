import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL;

export const tikeraApi = createApi({
  reducerPath: "tikeraApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Movies", "Screenings", "Bookings"],
  endpoints: (build) => ({
    getMovies: build.query({
      query: () => "/movies",
      transformResponse: (res) => res.data,
      providesTags: ["Movies", "Screenings", "Bookings"],
    }),
    getMoviesOnWeek: build.query({
      query: (week_number) => `/movies/week?week_number=${week_number}`,
      transformResponse: (res) => res.data,
      providesTags: ["Movies", "Screenings", "Bookings"],
    }),
    getBookings: build.query({
      query: () => `/bookings`,
      transformResponse: (res) => res.data,
      providesTags: ["Bookings"],
    }),

    // User
    addBooking: build.mutation({
      query: (booking) => ({
        url: "/bookings",
        method: "POST",
        body: booking,
      }),
      invalidatesTags: ["Bookings"],
    }),
    // Admin
    deleteMovie: build.mutation({
      query: (movieId) => ({
        url: `/movies/${movieId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movies"],
    }),
    deleteScreening: build.mutation({
      query: (screeningId) => ({
        url: `/screenings/${screeningId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Screenings"],
    }),
    addMovie: build.mutation({
      query: (movie) => ({
        url: `/movies`,
        method: "POST",
        body: movie,
      }),
      invalidatesTags: ["Movies"],
    }),
    addScreening: build.mutation({
      query: (screening) => ({
        url: `/screenings`,
        method: "POST",
        body: screening,
      }),
      invalidatesTags: ["Screenings"],
    }),
    updateMovie: build.mutation({
      query: ({ movieId, updateData }) => ({
        url: `/movies/${movieId}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Movies"],
    }),
    updateScreening: build.mutation({
      query: ({ screeningId, updateData }) => ({
        url: `/screenings/${screeningId}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Screenings"],
    }),

    login: build.mutation({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
    }),
    register: build.mutation({
      query: (registerData) => ({
        url: "/register",
        method: "POST",
        body: registerData,
      }),
    }),
  }),
});

// hooks
export const {
  useGetMoviesQuery,
  useGetMoviesOnWeekQuery,
  useAddBookingMutation,
  useLoginMutation,
  useRegisterMutation,
  useGetBookingsQuery,
  useUpdateMovieMutation,
  useUpdateScreeningMutation,
  useAddMovieMutation,
  useAddScreeningMutation,
  useDeleteMovieMutation,
  useDeleteScreeningMutation,
} = tikeraApi;
