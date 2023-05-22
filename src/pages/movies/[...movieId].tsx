import PageContentLayout from "components/PageContentLayout/PageContentLayout";
import { buildTmdbImageUrl } from "lib/assets";
import { SearchApi } from "lib/search";
import Image from "next/image";

import styles from "styles/movie.module.scss";

export default function MovieDetails({ film }: { film: Movie }) {
  return (
    <PageContentLayout noMargin>
      <div className={"movie-details"}>
        <div
          className={styles["backdrop-image"]}
          style={{
            background: `url(${buildTmdbImageUrl(
              film.backdrop_path
            )}) no-repeat center center fixed`,
          }}
        >
          <div className={styles["header-hero"]}>
            <div className={styles["thumbnail"]}>
              <Image
                src={buildTmdbImageUrl(film.poster_path)}
                alt={`Movie "${film.title}" thumbnail`}
                height={922 / 2}
                width={615 / 2}
              />
            </div>
            <div className={styles["header"]}>
              <h1 className={styles["title"]}>{film.title}</h1>
              <p className={styles["overview"]}>{film.overview}</p>
            </div>
          </div>
        </div>
        <div className={styles["thumbnail"]}>
          <Image
            src={buildTmdbImageUrl(film.poster_path)}
            alt={`Movie "${film.title}" thumbnail`}
            height={922}
            width={615}
          />
        </div>
        <div className="details">
          <section className="videos"></section>
        </div>
      </div>
    </PageContentLayout>
  );
}

export async function getServerSideProps({ query }) {
  const movieId = query.movieId?.[0] || "";

  const searchApi = new SearchApi();
  const film = await searchApi.getMovie(Number(movieId));

  return {
    props: {
      film,
    },
  };
}
