import React from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <header>
        <h1>Fabric Stack</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
