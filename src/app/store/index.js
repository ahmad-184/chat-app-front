import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { encryptTransform } from "redux-persist-transform-encrypt";

import appReducer from "../slices/app";
import authReducer from "../slices/auth";
import chatConversationReducer from "../slices/chat_conversation";

import { SECRET_KEY } from "../../config";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  transforms: [
    encryptTransform({
      secretKey: SECRET_KEY,
      onError: function (error) {
        console.log(error);
      },
    }),
  ],
};

const compinedReducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  chat_conversation: chatConversationReducer,
});

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, compinedReducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  // devTools: true,
});

const persistedStore = persistStore(store);

export { store, persistedStore };
