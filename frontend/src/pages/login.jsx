import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "config";
import { useAuth } from "context/auth";

export default function LoginPage() {
  const location = useLocation();
  const { onLogin } = useAuth();
  const id = React.useId();
  const [loginMessage, setLoginMessage] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const usernameId = `username-${id}`;
  const passwordId = `password-${id}`;

  React.useEffect(() => {
    if (location.state?.loginMsg) {
      setLoginMessage(location.state.loginMsg);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginMessage("");
    try {
      await onLogin(username, password);
    } catch (err) {
      setLoginMessage(err.message || err.detail);
    }
  };

  return (
    <>
      <Helmet title={SITE_NAME} />
      <h2>Login</h2>
      {loginMessage ? <div style={{ color: "red" }}>{loginMessage}</div> : null}
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
