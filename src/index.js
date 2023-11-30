import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store.js";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container);

let persistor = persistStore(store);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
