import { TMDB_IMAGE_BASE_URL } from "constants/api";

export function buildTmdbImageUrl(path: string) {
  return TMDB_IMAGE_BASE_URL + path;
}
