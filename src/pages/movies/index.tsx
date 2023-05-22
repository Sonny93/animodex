import MovieCard from "components/MovieCard/MovieCard";
import PageContentLayout from "components/PageContentLayout/PageContentLayout";
import { SearchApi } from "lib/search";
import Head from "next/head";

import styles from "styles/movies.module.scss";

export default function PageMovieList({ films }: { films: Movie[] }) {
  return (
    <PageContentLayout>
      <Head>
        <title>Animodex - {films.length} films</title>
      </Head>
      <div className={styles["displayMoviesCards"]}>
        {films.map((film) => (
          <MovieCard film={film} key={film.id} />
        ))}
      </div>
    </PageContentLayout>
  );
}

export async function getServerSideProps() {
  const searchApi = new SearchApi();
  const { results: films } = await searchApi.discover();
  return {
    props: {
      films,
    },
  };
}
