import { TMDB_BASE_URL } from "constants/api";
import { BaseApi } from "./api";

export class SearchApi extends BaseApi {
  constructor(baseUrl = TMDB_BASE_URL) {
    super(baseUrl);
  }

  search = async (term: string): Promise<ApiResult> => {
    if (!term) {
      throw new Error("Missing term");
    }

    return await this.request(`/search/movie?query=${term}`);
  };

  discover = async (): Promise<ApiResult> =>
    await this.request("/discover/movie");
}

export async function makeRequest({
  url = TMDB_BASE_URL,
  path,
  method = "GET",
  query = "",
}: {
  url?: string;
  path?: string;
  method?: RequestInit["method"];
  query?: string;
}) {
  return fetch(url + (path ? `/${path}` : "") + "?language=fr-FR", {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.TMDB_API_KEY,
    },
  }).then((req) => req.json());
}
