import { Suspense } from "react";
// routes
import Routes from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";
// toast
import SnakbarProvider from "./components/SnakbarProvider";
// import i18next config file
import "./i18next";
// simplebar-react styles
import "simplebar-react/dist/simplebar.min.css";
// swiper css file
import "swiper/css";
import "swiper/css/free-mode";

function App() {
  return (
    <Suspense fallback={"loading..."}>
      <ThemeProvider>
        <ThemeSettings>
          <SnakbarProvider />
          <Routes />
        </ThemeSettings>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
