import "./style.css";
import MovieListings from "./components/MovieListings";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/Auth/Login";
import { Layout } from "./layout/Layout";
import RequireAuth from "./components/Auth/RequireAuth";
import Register from "./components/Auth/Register";
import Bookings from "./components/Bookings/Bookings";
import AddMovieModal from "./components/Movies/AddMovieModal";
import AddScreeningModal from "./components/Screenings/AddScreeningModal";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <>
                  <MovieListings />
                  <AddMovieModal />
                  <AddScreeningModal />
                </>
              }
            />
            <Route
              path="/bookings"
              element={
                <RequireAuth>
                  <Bookings />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
