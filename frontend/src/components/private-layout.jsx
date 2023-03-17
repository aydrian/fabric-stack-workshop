import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function PrivateLayout() {
  const { onLogout, user } = useAuth();
  return (
    <>
      <header>
        <NavLink to="/profile">Profile</NavLink>
        {user?.is_admin ? <NavLink to="/admin">Admin</NavLink> : null}
        <span>Welcome {user?.full_name}</span>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer Content</footer>
    </>
  );
}
