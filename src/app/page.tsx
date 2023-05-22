import { makeRequest } from "lib/api";
import styles from "./page.module.scss";

export default async function Home() {
  const animes = await makeRequest({
    url: "http://localhost:3000",
    path: "api/mal",
  });
  console.log(animes);
  return (
    <main className={styles.main}>
      <h1>Animodex</h1>
      <p>Bienvenue sur animodex</p>
      {JSON.stringify(animes)}
    </main>
  );
}
