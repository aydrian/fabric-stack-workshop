import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

// Try to separate imports from libraries and imports from your own code.
import { SITE_NAME } from "config";
import { useAuth } from "context/auth";
import { Card } from "components/card";
import { Input } from "components/input";
import { Button } from "components/button";

export default function LoginPage() {
  const location = useLocation();
  const { onLogin } = useAuth();
  const id = React.useId();
  const [loginMessage, setLoginMessage] = React.useState("");
  const usernameId = `username-${id}`;
  const passwordId = `password-${id}`;

  React.useEffect(() => {
    if (location.state?.loginMsg) {
      setLoginMessage(location.state.loginMsg);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { username, password } = Object.fromEntries(formData.entries());
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
      <Card>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor={usernameId}>Username:</label>
            <Input type="text" id={usernameId} name="username" required />
          </div>
          <div className="input-block">
            <label htmlFor={passwordId}>Password:</label>
            <Input type="password" id={passwordId} name="password" required />
          </div>
          <Button type="submit">Login</Button>
          <div>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </Card>
      {loginMessage ? (
        <div style={{ color: "red", marginTop: "1rem" }}>{loginMessage}</div>
      ) : null}
    </>
  );
}
