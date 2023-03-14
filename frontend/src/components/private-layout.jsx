import React from "react";
import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <>
      <header>Nav Items</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer Content</footer>
    </>
  );
}
