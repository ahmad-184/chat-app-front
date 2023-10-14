// routes
import Routes from "./routes";
// theme
import ThemeProvider from "./theme";
// components
// import ThemeSettings from "./components/settings";

import "simplebar-react/dist/simplebar.min.css";

function App() {
  return (
    <ThemeProvider>
      {/* <ThemeSettings> */}
      <Routes />
      {/* </ThemeSettings> */}
    </ThemeProvider>
  );
}

export default App;
