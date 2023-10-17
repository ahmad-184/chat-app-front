import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

import appReducer from "../slices/app";
import authReducer from "../slices/auth";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
};

const compinedReducers = combineReducers({
  app: appReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, compinedReducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistedStore = persistStore(store);

export { store, persistedStore };
