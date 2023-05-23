import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./utils/i18n";
import { ThemeProvider, createTheme } from "@mui/material";
import { Suspense } from "react";
import MainLoading from "./components/MainLoading";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    d300: true;
    d400: true;
    d500: true;
    d600: true;
    d700: true;
    d800: true;
    d900: true;
    d1000: true;
    d1100: true;
    d1200: true;
    d1300: true;
    d1400: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 540,
      md: 900,
      lg: 1200,
      xl: 1536,
      d300: 300,
      d400: 400,
      d500: 500,
      d600: 600,
      d700: 700,
      d800: 800,
      d900: 900,
      d1000: 1000,
      d1100: 1100,
      d1200: 1200,
      d1300: 1300,
      d1400: 1400,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Suspense fallback={<MainLoading className={"full-height"} />}>
        <App />
      </Suspense>
    </ThemeProvider>
  </Provider>
);
