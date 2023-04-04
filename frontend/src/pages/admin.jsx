import React from "react";
import useSWR from "swr";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "config";

import { Card } from "components/card";
import { Button } from "components/button";
import { useAuth } from "context/auth";
import * as UserService from "services/user";
import { fetcher } from "services";
import { USERS_ENDPOINT } from "services/user";

export default function AdminPage() {
  const { onUnauthorized } = useAuth();
  const { data, error, isLoading, mutate } = useSWR(USERS_ENDPOINT, fetcher, {
    onError: onUnauthorized,
  });

  const handleDelete = async (id) => {
    mutate(async (data) => {
      await UserService.delUser(id).catch(onUnauthorized);
      const users = data.users.filter((user) => user.id !== id);
      return { ...data, users };
    });
  };

  const handleToggleAdmin = async (id, is_admin) => {
    mutate(
      async (data) => {
        const response = await UserService.setAdmin(id, !is_admin).catch(
          onUnauthorized
        );

        const userIndex = data.users.findIndex((user) => user.id === id);
        const users = [...data.users];
        users[userIndex] = response.user;
        return { ...data, users };
      },
      { revalidate: false }
    );
  };

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <>
      <Helmet title={`${SITE_NAME}: Admin`} />
      <h2>Admin</h2>
      {data?.users ? (
        <Card className="card--blue">
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
                    <td className="cell-center">
                      <input
                        type="checkbox"
                        checked={user.is_admin}
                        onChange={() =>
                          handleToggleAdmin(user.id, user.is_admin)
                        }
                        title={`${user.is_admin ? "Remove" : "Make"} Admin`}
                      />
                    </td>
                    <td>
                      <Button
                        className="button--red"
                        type="button"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      ) : null}
    </>
  );
}
