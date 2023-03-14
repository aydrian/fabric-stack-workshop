import React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const id = React.useId();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const usernameId = `username-${id}`;
  const passwordId = `password-${id}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={usernameId}>Username:</label>
          <input
            type="text"
            id={usernameId}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor={passwordId}>Password:</label>
          <input
            type="password"
            id={passwordId}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <div>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </>
  );
}
