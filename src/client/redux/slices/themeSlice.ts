import { createSlice } from "@reduxjs/toolkit";

type themeState = {
  theme: "light" | "dark";
};

const initialState: themeState = JSON.parse(
  localStorage.getItem("samo_blog-theme") || '{ "theme": "light" }'
);

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("samo_blog-theme", JSON.stringify(state));
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
