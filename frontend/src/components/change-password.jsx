import React from "react";

import { Button } from "components/button";
import { Input } from "components/input";

export function ChangePassword({ handleChangePassword }) {
  const id = React.useId();
  const [formMessage, setFormMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const newPasswordId = `newPassword-${id}`;
  const confirmPasswordId = `confirmPassword-${id}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { newPassword, confirmPassword } = Object.fromEntries(
      formData.entries()
    );
    setFormMessage("");
    setError("");
    if (newPassword !== confirmPassword) {
      return setError("Passwords must match");
    }
    try {
      await handleChangePassword(newPassword);
      setFormMessage("Password successfully changed.");
      form.reset();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formMessage.length > 0 ? (
        <div style={{ color: "green" }}>{formMessage}</div>
      ) : null}
      {error.length > 0 ? <div style={{ color: "red" }}>{error}</div> : null}
      <div className="input-block">
        <label htmlFor={newPasswordId}>New Password:</label>
        <Input type="password" id={newPasswordId} name="newPassword" required />
      </div>
      <div className="input-block">
        <label htmlFor={confirmPasswordId}>Confirm Password:</label>
        <Input
          type="password"
          id={confirmPasswordId}
          name="confirmPassword"
          required
        />
      </div>
      <Button type="submit">Change Password</Button>
    </form>
  );
}
