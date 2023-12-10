import { Suspense } from "react";
// routes
import Routes from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";
// toast
import ToasterProvider from "./components/ToastProvider";

import { Box, Stack } from "@mui/material";

import logo from "./assets/Images/logo.ico";
// import i18next config file
import "./i18next";
// simplebar-react styles
import "simplebar-react/dist/simplebar.min.css";
// swiper css styles
import "swiper/css";
import "swiper/css/free-mode";
// lightbox css styles
import "yet-another-react-lightbox/styles.css";

const AppFallback = () => {
  return (
    <Stack
      position={"absolute"}
      top={0}
      left={0}
      right={0}
      bottom={0}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack spacing={1} justifyContent={"center"} alignItems="center">
        <Box width={140}>
          <img style={{ width: "100%" }} src={logo} alt="app logo" />
        </Box>
      </Stack>
    </Stack>
  );
};

function App() {
  return (
    <Suspense fallback={<AppFallback />}>
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
