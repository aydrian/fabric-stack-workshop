import React from "react";
import useSWR from "swr";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "config";

import { ChangePassword } from "components/change-password";
import { Card } from "components/card";
import { useAuth } from "context/auth";
import { fetcher } from "services";
import { CURRENT_USER_ENDPOINT, update } from "services/user";

import "./profile.scss";

export default function ProfilePage() {
  const { onUnauthorized } = useAuth();
  const { data, error, isLoading } = useSWR(CURRENT_USER_ENDPOINT, fetcher, {
    onError: onUnauthorized,
  });

  const handleChangePassword = async (newPassword) => {
    try {
      await update(data.user.id, { password: newPassword });
    } catch (err) {
      throw new Error("An error occurred attempting to change your password.");
    }
  };

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <>
      <Helmet title={`${SITE_NAME}: My Profile`} />
      <h2>Profile</h2>
      <Card className="profile-card card--blue">
        <img
          src="https://picsum.photos/200"
          alt={`${data.user.username} avatar`}
          className="profile-avatar"
        />
        <h3>{data.user.username}</h3>
        <h4>{data.user.full_name}</h4>
      </Card>
      <section className="change-password-section">
        <h3>Change Password</h3>
        <ChangePassword handleChangePassword={handleChangePassword} />
      </section>
    </>
  );
}
