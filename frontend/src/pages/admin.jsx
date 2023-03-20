import React from "react";
import useSWR from "swr";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "../config";

import { useAuth } from "../context/auth";
import * as UserService from "../services/user";
import { fetcher } from "../services";
import { USERS_ENDPOINT } from "../services/user";

export default function AdminPage() {
  const { onUnauthorized } = useAuth();
  const { data, error, isLoading, mutate } = useSWR(USERS_ENDPOINT, fetcher, {
    onError: onUnauthorized
  });

  const handleDelete = async (id) => {
    await UserService.delUser(id).catch(onUnauthorized);
    mutate();
  };

  const handleToggleAdmin = async (id, is_admin) => {
    await UserService.setAdmin(id, !is_admin).catch(onUnauthorized);
    mutate();
  };

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <>
      <Helmet title={`${SITE_NAME}: Admin`} />
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
                    <td>
                      <input
                        type="checkbox"
                        checked={user.is_admin}
                        onClick={() =>
                          handleToggleAdmin(user.id, user.is_admin)
                        }
                        title={`${user.is_admin ? "Remove" : "Make"} Admin`}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
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
