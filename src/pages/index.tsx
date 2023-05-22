import PageContentLayout from "components/PageContentLayout/PageContentLayout";
import { SearchApi } from "lib/search";

import styles from "styles/page.module.scss";

export default function Home({ genres }: { genres: Genre[] }) {
  return (
    <PageContentLayout>
      <h1>Animodex</h1>
      <p>Bienvenue sur Animodex</p>
      <div className="movies">
        {genres.map((genre) => (
          <GenreGroup key={genre.id} genre={genre} />
        ))}
      </div>
    </PageContentLayout>
  );
}

function GenreGroup({ genre }: { genre: Genre }) {
  return (
    <div className={styles["genre-group"]}>
      <h2>{genre.name}</h2>
      <div></div>
    </div>
  );
}

export async function getServerSideProps() {
  const searchApi = new SearchApi();
  const { genres } = await searchApi.getGenres();
  return {
    props: {
      genres: await Promise.all(
        genres.map(({ id }) => searchApi.getMoviesByGenre(id))
      ),
    },
  };
}
