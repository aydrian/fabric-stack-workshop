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
  const [formMessage, setFormMessage] = React.useState("");
  const usernameId = `username-${id}`;
  const passwordId = `password-${id}`;
  const confirmPasswordId = `confirmPassword-${id}`;
  const fullnameId = `fullname-${id}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { username, password, fullname, confirmPassword } =
      Object.fromEntries(formData.entries());
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
            <Input type="text" id={fullnameId} name="fullname" required />
          </div>
          <div className="input-block">
            <label htmlFor={usernameId}>Username:</label>
            <Input type="text" id={usernameId} name="username" required />
          </div>
          <div className="input-block">
            <label htmlFor={passwordId}>Password:</label>
            <Input type="password" id={passwordId} name="password" required />
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
          <Button type="submit">Sign up</Button>
          <div>
            Already have an account? <Link to="/">Log in</Link>
          </div>
        </form>
      </Card>
    </>
  );
}
