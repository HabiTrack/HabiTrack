import React, { useContext } from "react";
import axios from "axios";

import { useAuth } from "./AuthContext";

const StoreContext = React.createContext();

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }) {
  const { token } = useAuth();

  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const value = {
    axios: axios,
    host: "http://localhost:5000",
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
