"use client";
import { createContext, useEffect, useState } from "react";
export const context = createContext();
export default function Context({ children }) {
  const [state, setState] = useState({
    current: null,
    user: null,
  });
  useEffect(() => {
    setState({
      ...state,
      user: {
        ...state.user,
        token: JSON.parse(localStorage.getItem("state"))?.user?.token,
      },
    });
  }, []);

  return (
    <context.Provider value={{ state, setState }}>{children}</context.Provider>
  );
}
