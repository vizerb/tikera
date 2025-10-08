import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./dateSlice";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
import themeReducer from "./themeSlice";
import { tikeraApi } from "./tikeraApiSlice";

export const store = configureStore(
  {
    reducer: {
      date: dateReducer,
      auth: authReducer,
      modal: modalReducer,
      theme: themeReducer,
      [tikeraApi.reducerPath]: tikeraApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tikeraApi.middleware),
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
