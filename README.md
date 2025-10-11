# Tikera

[**Magyar leírás**](./README_HU.md)

## About

Tikera (a cinema ticket booking web app) is the final programming project for the **Client-side Web Programming** course, part of the Computer Science BSc program at ELTE.
<br>The REST API was provided, and the main task was to develop the front-end of the Tikera application using **React**, **Redux**, and **RTK Query**.

An earlier, more basic version of the project is hosted on Vercel: [tikkera.vercel.app](https://tikkera.vercel.app)

## Tasks

### Authentication

- Users can register, login, and logout.
- Admins can login and logout.

### Core features

- Everyone can view and navigate listings of movies and screenings.
- Users can book seats for screenings and check which screenings they've booked seats for.
- Admins can create, modify and remove movies and screenings.

### Additional features

- **Dark/light theme** preference, saved in localStorage.
- The website features a **responsive design** for optimal viewing on all devices.
- **Toasts** that display information about the result of operations (successfull/failed).

## Libraries used

- [**React**](https://react.dev/) – A JavaScript library for building user interfaces.
- [**Redux**](https://redux.js.org/) – A predictable state container for managing application state.
- [**RTK Query**](https://redux-toolkit.js.org/rtk-query/overview) – A data fetching and caching tool built into Redux Toolkit.
- [**Tailwind CSS**](https://tailwindcss.com/) – A utility-first CSS framework for designing responsive interfaces.
- [**daisyUI**](https://daisyui.com/) – A Tailwind CSS plugin that provides prebuilt, themeable UI components.
- [**Framer Motion**](https://motion.dev/) – A React animation library for creating smooth and interactive UI transitions.

## Run locally

**Requirements:**
[**Node.js**](https://nodejs.org/), [**PHP**](https://www.php.net/), [**Composer**](https://getcomposer.org/)

1. Launch REST API: Navigate to `server` folder and run the init script.

   - Windows:`init.bat`
   - Linux: `init.sh`

2. Launch Client: Navigate to `client` folder and run

   ```
   npm install
   npm run dev
   ```

### Testing

Admin user credentials:
<br>email: `admin@example.com`
<br>password: `admin`

