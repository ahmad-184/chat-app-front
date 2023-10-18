import { Suspense } from "react";
// routes
import Routes from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";
// toast
import ToasterProvider from "./components/ToasterProvider";
// import i18next config file
import "./i18next";
// simplebar-react styles
import "simplebar-react/dist/simplebar.min.css";
// react-toastify stryles
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Suspense>
      <ThemeProvider>
        <ThemeSettings>
          <ToasterProvider />
          <Routes />
        </ThemeSettings>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
