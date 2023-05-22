import { MAL_BASE_URL } from "constants/api";

export async function getAnimes() {
  return makeRequest({ path: "/anime" });
}

export async function makeRequest({
  url = MAL_BASE_URL,
  path,
  method = "GET",
}: {
  url?: string;
  path?: string;
  method?: RequestInit["method"];
}) {
  return fetch(url + (path ? `/${path}` : ""), {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.MAL_CLIENT_SECRET,
    },
  }).then((req) => req.json());
}
