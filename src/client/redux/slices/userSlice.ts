import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type currentUserState = {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type userState = {
  currentUser?: null | currentUserState;
  error?: null | string;
  loading?: boolean;
};

const initialState: userState = JSON.parse(
  localStorage.getItem("samo_blog-current-user") || "{}"
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
      return state;
    },
    signInSuccess: (state, action: PayloadAction<currentUserState>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem("samo_blog-current-user", JSON.stringify(state));
      return state;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      return state;
    }
  }
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
