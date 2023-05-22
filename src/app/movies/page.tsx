import MovieCard from "components/MovieCard/MovieCard";
import { SearchApi } from "lib/search";
import styles from "./movies.module.scss";

export default async function PageMovies() {
  const searchApi = new SearchApi();
  const { results: films } = await searchApi.discover();

  return (
    <div className={styles["displayMoviesCards"]}>
      {films.map((film) => (
        <MovieCard film={film} key={film.id} />
      ))}
    </div>
  );
}
