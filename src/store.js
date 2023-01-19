import { configureStore } from "@reduxjs/toolkit";

import libraryReducer from "./reducers/libraryReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: { user: userReducer, library: libraryReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
