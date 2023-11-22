"use client";
import { context } from "@/myComponents/Context";
import Loader from "@/myComponents/Loader";
import { useContext } from "react";

export default function page() {
  const {
    state: {
      current: { title },
    },
  } = useContext(context);
  if (!title) return <Loader />;
  return <div>{title}</div>;
}
