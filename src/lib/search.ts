import { TMDB_BASE_URL } from "constants/api";
import { BaseApi } from "./api";

export class SearchApi extends BaseApi {
  constructor(baseUrl = TMDB_BASE_URL) {
    super(baseUrl);
  }

  search = async (term: string): Promise<MovieApiResult> => {
    if (!term) {
      throw new Error("Missing term");
    }

    return await this.request(`/search/movie?query=${term}`);
  };

  discover = async (): Promise<MovieApiResult> =>
    await this.request("/discover/movie");

  getMovie = async (movieId: Movie["id"]): Promise<Movie> =>
    await this.request(`/movie/${movieId}`);

  getGenres = async (): Promise<{ genres: Genre[] }> =>
    await this.request(`/genre/movie/list`);

  getMoviesByGenre = async (id: Genre["id"]) =>
    await this.request(`/discover/movie?with_genres=${id}`);
}
