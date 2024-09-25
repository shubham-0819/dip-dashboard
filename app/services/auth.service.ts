// this module is used to authenticate the user, it will make several REST API calls to the server to authenticate the user.

import { config } from "./config";

const baseUrl = config.api;

function login(username: string, password: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(`http:/localhost:9091/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status !== 200) {
          reject(false);
        }
        resolve(response.json());
      })
      .catch(() => {
        reject(false);
      });
  });
}

export { login };
