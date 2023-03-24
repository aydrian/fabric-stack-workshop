import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { SITE_NAME } from "config";
import { useAuth } from "context/auth";

import { Card } from "components/card";
import { Input } from "components/input";
import { Button } from "components/button";

export default function SignupPage() {
  const { onRegister } = useAuth();
  const id = React.useId();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [fullname, setFullname] = React.useState("");
  const [formMessage, setFormMessage] = React.useState("");
  const usernameId = `username-${id}`;
  const passwordId = `password-${id}`;
  const confirmPasswordId = `confirmPassword-${id}`;
  const fullnameId = `fullname-${id}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");
    if (password !== confirmPassword) {
      return setFormMessage("Passwords must match");
    }

    try {
      await onRegister(username, password, fullname);
    } catch (err) {
      return setFormMessage(err.detail);
    }
  };

  return (
    <>
      <Helmet title={`${SITE_NAME}: Sign up`} />
      <h2>Sign up</h2>
      <Card>
        <form onSubmit={handleSubmit}>
          {formMessage.length > 0 ? <div>{formMessage}</div> : null}
          <div className="input-block">
            <label htmlFor={fullnameId}>Full name: </label>
            <Input
              type="text"
              id={fullnameId}
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
          <div className="input-block">
            <label htmlFor={usernameId}>Username:</label>
            <Input
              type="text"
              id={usernameId}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-block">
            <label htmlFor={passwordId}>Password:</label>
            <Input
              type="password"
              id={passwordId}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-block">
            <label htmlFor={confirmPassword}>Confirm Password:</label>
            <Input
              type="password"
              id={confirmPasswordId}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Sign up</Button>
          <div>
            Already have an account? <Link to="/">Log in</Link>
          </div>
        </form>
      </Card>
    </>
  );
}
