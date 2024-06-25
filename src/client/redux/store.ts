// npm install @reduxjs/toolkit react-redux

import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { themeSlice } from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    theme: themeSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
