import React from "react";
import useSWR from "swr";

import * as UserService from "../services/user";
import { fetcher } from "../services";
import { USERS_ENDPOINT } from "../services/user";

export default function AdminPage() {
  const { data, error, isLoading, mutate } = useSWR(USERS_ENDPOINT, fetcher);

  const handleDelete = async (id) => {
    await UserService.delUser(id);
    mutate();
  };

  const handleToggleAdmin = async (id, is_admin) => {
    await UserService.setAdmin(!is_admin);
    mutate();
  };

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <>
      <h2>Admin</h2>
      {data?.users ? (
        <section>
          <h3>Users</h3>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Is Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.users?.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.full_name}</td>
                    <td>{user.is_admin.toString()}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleToggleAdmin(user.id, user.is_admin)
                        }
                      >
                        {`${user.is_admin ? "Revoke" : "Grant"}`} Admin
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : null}
    </>
  );
}
