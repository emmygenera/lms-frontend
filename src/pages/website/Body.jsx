import React from "react";
import { Nav } from "../whitenav";

export default function Body({ children }) {
  return (
    <>
      <Nav />
      <div className="container mt-2">
        <div className="py-5 mt-5" />
        {children}
        <div className="p-5 my-5" />
      </div>
    </>
  );
}
