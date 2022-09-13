import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import DbStore from "./store/DbStore";
import UserStore from "./store/UserStore";

export const Context = createContext(null);

console.log("env=", process.env.REACT_APP_API_URL);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      dbData: new DbStore(),
    }}
  >
    <App />
  </Context.Provider>
);
