import { Suspense } from "react";
// routes
import Routes from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";

// import i18next config file
import "./i18next";

import "simplebar-react/dist/simplebar.min.css";

function App() {
  return (
    <Suspense>
      <ThemeProvider>
        <ThemeSettings>
          <Routes />
        </ThemeSettings>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
