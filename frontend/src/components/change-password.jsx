import React from "react";

export function ChangePassword({ handleChangePassword }) {
  const id = React.useId();
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [formMessage, setFormMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const newPasswordId = `newPassword-${id}`;
  const confirmPasswordId = `confirmPassword-${id}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");
    setError("");
    if (newPassword !== confirmPassword) {
      return setError("Passwords must match");
    }
    try {
      await handleChangePassword(newPassword);
      setNewPassword("");
      setConfirmPassword("");
      setFormMessage("Password successfully changed.");
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
      <div>
        <label htmlFor={newPasswordId}>New Password:</label>
        <input
          type="password"
          id={newPasswordId}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor={confirmPassword}>Confirm Password:</label>
        <input
          type="password"
          id={confirmPasswordId}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Change Password</button>
    </form>
  );
}
