import { API_BASE_URL } from "config";
import { parseJson } from ".";

export class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
    this.status = 401;
  }
}

export const register = (username, password, full_name) => {
  return fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ username, password, full_name }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(parseJson);
};

export const login = (username, password) => {
  const data = new URLSearchParams({ username, password });
  return fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    body: data,
    credentials: "include"
  }).then(parseJson);
};

export const logout = () => {
  return fetch(`${API_BASE_URL}/auth/logout`);
};
