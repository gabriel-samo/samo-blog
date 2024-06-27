import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type currentUserState = {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profilePicture?: string;
  name?: string;
  __v: number;
};

type userState = {
  currentUser?: null | currentUserState;
  errorMsg?: null | string;
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
      state.errorMsg = null;
      return state;
    },
    signInSuccess: (state, action: PayloadAction<currentUserState>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.errorMsg = null;
      localStorage.setItem("samo_blog-current-user", JSON.stringify(state));
      return state;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMsg = action.payload;
      return state;
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.errorMsg = null;
      return state;
    },
    updateUserSuccess: (state, action: PayloadAction<currentUserState>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.errorMsg = null;
      localStorage.setItem("samo_blog-current-user", JSON.stringify(state));
      return state;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMsg = action.payload;
      return state;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.errorMsg = null;
      return state;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.errorMsg = null;
      localStorage.setItem("samo_blog-current-user", JSON.stringify(state));
      return state;
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorMsg = action.payload;
      return state;
    }
  }
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess
} = userSlice.actions;
