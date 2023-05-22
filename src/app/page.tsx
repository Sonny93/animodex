import { SearchApi } from "lib/search";
import styles from "./page.module.scss";

export default async function Home() {
  const searchApi = new SearchApi();
  const { results: animes } = await searchApi.discover();

  return (
    <main className={styles.main}>
      <h1>Animodex</h1>
      <p>Bienvenue sur animodex</p>
      <ul className="movies">
        {animes.map((anime) => (
          <li key={anime.id}>{anime.title}</li>
        ))}
      </ul>
    </main>
  );
}
