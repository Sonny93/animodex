export class BaseApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    if (!baseUrl) {
      throw new Error("Missing base URL to fetch");
    }

    this.baseUrl = baseUrl;
  }

  async request(pathname: string, withToken = true) {
    if (!pathname) {
      throw new Error("Pathname is missing");
    }

    const finalUrl =
      this.baseUrl +
      pathname +
      (withToken
        ? `${pathname.includes("?") ? "&" : "?"}language=fr-FR&api_key=${
            process.env.TMDB_API_KEY
          }`
        : "");
    const request = await fetch(finalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await request.json();
  }
}
