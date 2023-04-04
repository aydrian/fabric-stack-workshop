import { API_BASE_URL } from "config";
import { parseJson } from ".";

export const USERS_ENDPOINT = `${API_BASE_URL}/users/`;
export const CURRENT_USER_ENDPOINT = `${USERS_ENDPOINT}me`;

export const update = (id, fields) => {
  return fetch(`${USERS_ENDPOINT}/${id}`, {
    method: "PUT",
    body: JSON.stringify(fields),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  }).then(parseJson);
};

export const setAdmin = (id, is_admin) => {
  return fetch(`${USERS_ENDPOINT}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ is_admin }),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  }).then(parseJson);
};

export const delUser = (id) => {
  return fetch(`${USERS_ENDPOINT}/${id}`, {
    method: "DELETE",
    credentials: "include"
  });
};
