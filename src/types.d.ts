interface Movie {
  adult: boolean;
  backdrop_path: string;
  genres: GenreInfo[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieApiResult {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface GenreInfo {
  id: number;
  name: string;
}

interface Genre extends GenreInfo {
  movies: Movie[];
}
