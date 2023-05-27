import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Store from "./store.js";
// import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./app/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = new Store();
export const Context = createContext({
  store,
});

root.render(
  <Context.Provider
    value={{
      store,
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);
