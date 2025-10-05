"use client";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: ReactNode }) => {
  if (typeof window === "undefined") return null;
  const el = document.getElementById("portal-root");
  return el ? createPortal(children, el) : null;
};
export default Portal;
