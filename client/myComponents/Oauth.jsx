"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Oauth({ children }) {
  console.log(process.env.NEXT_PUBLIC_CLIENTID, "envvvv");
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENTID}>
      {children}
    </GoogleOAuthProvider>
  );
}
