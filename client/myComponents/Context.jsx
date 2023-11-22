"use client";
import { createContext, useState } from "react";
export const context = createContext();
export default function Context({ children }) {
  const [state, setState] = useState();
  return (
    <context.Provider value={{ state, setState }}>{children}</context.Provider>
  );
}
