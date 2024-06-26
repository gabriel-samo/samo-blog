import "./styles/app.css";
import "react-circular-progressbar/dist/styles.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import ThemeProvider from "./components/ThemeProvider";
import { store } from "./redux/store";
import { Provider } from "react-redux";

// ESBuild Hot Reload for dev environment only
if (process.env.NODE_ENV === "development") {
  new EventSource("/esbuild").addEventListener("change", () =>
    location.reload()
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
