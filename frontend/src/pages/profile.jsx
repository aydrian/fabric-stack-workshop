import React from "react";
import useSWR from "swr";

import { fetcher } from "../services";
import { CURRENT_USER_ENDPOINT } from "../services/user";

export default function ProfilePage() {
  const { data, error, isLoading } = useSWR(CURRENT_USER_ENDPOINT, fetcher);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <>
      <h2>Profile</h2>
      <img
        src="https://picsum.photos/200"
        alt={`${data.user.username} avatar`}
      />
      <h3>{data.user.username}</h3>
      <h4>{data.user.full_name}</h4>
    </>
  );
}
