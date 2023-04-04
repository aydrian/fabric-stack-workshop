import { AuthorizationError } from "./auth";

export const fetcher = (url) =>
  fetch(url, { credentials: "include" }).then(parseJson);

export const parseJson = (response) => {
  return response.json().then((json) => {
    if (response.status === 401) {
      throw new AuthorizationError(json.detail);
    }
    if (!json.ok) {
      throw json;
    }

    return json;
  });
};
