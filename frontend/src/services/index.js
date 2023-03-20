import { AuthorizationError } from "./auth";

export const fetcher = (url) =>
  fetch(url, { credentials: "include" }).then(parseJson);

export const parseJson = (response) => {
  if (response.status === 401) {
    throw new AuthorizationError();
  }
  return response.json().then((json) => {
    if (!json.ok) {
      throw json;
    }

    return json;
  });
};
