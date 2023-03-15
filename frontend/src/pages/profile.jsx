import React from "react";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export default function ProfilePage() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/users/me",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <>
      <h2>Profile</h2>
      <img src="https://picsum.photos/200" alt={`${data.username} avatar`} />
      <h3>{data.username}</h3>
      <h4>{data.full_name}</h4>
    </>
  );
}
