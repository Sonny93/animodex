export class BaseApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    if (!baseUrl) {
      throw new Error("Missing base URL to fetch");
    }

    this.baseUrl = baseUrl;
  }

  async request(pathname: string) {
    if (!pathname) {
      throw new Error("Pathname is missing");
    }

    const request = await fetch(
      this.baseUrl +
        pathname +
        `${pathname.includes("?") ? "&" : "?"}language=fr-FR&api_key=${
          process.env.TMDB_API_KEY
        }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.TMDB_API_KEY,
        },
      }
    );
    return await request.json();
  }
}
