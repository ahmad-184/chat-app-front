import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";

import SettingsProvider from "./contexts/SettingsContext";
import SocketProvider from "./contexts/SocketContext";
import { persistedStore, store } from "./app/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistedStore}>
          <SettingsProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </SettingsProvider>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  </StrictMode>
);
