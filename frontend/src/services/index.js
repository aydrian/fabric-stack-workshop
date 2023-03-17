export const fetcher = (url) =>
  fetch(url, { credentials: "include" })
    .then(parseJson)
    .catch(handleUnauthorized);

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

export const handleUnauthorized = (err) => {
  console.log(err);
  throw err;
};

export class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
  }
}
