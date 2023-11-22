"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Oauth({ children }) {
  return (
    <GoogleOAuthProvider clientId="1010338471882-l1c5f38sufjcle0dgjhbdbateli8ri4b.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
}
