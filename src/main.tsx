import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";

const theme = createTheme({
  fontFamily:
    "Inter, Inter Variable, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  headings: {
    fontFamily:
      "Inter, Inter Variable, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
