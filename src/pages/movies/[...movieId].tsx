import Image from "next/image";

import { AiOutlineCalendar } from "react-icons/ai";
import { BiMehBlank } from "react-icons/bi";
import { FcRating } from "react-icons/fc";
import { TbRating18Plus } from "react-icons/tb";

import PageContentLayout from "components/PageContentLayout/PageContentLayout";
import { buildTmdbImageUrl } from "lib/assets";
import { SearchApi } from "lib/search";

import Head from "next/head";
import styles from "styles/movie.module.scss";

export default function MovieDetails({ film }: { film: Movie }) {
  console.log(film);
  return (
    <PageContentLayout noMargin>
      <Head>
        <title>Animodex - {film.title}</title>
      </Head>
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
            <ul
              className={styles["movie-details"]}
              style={{
                fontSize: ".8em",
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
                gap: "1em",
              }}
            >
              <li>
                <FcRating size={24} /> {film.vote_average.toFixed(2)}
              </li>
              <li>
                <AiOutlineCalendar size={24} /> {film.release_date}
              </li>
              <li>
                <BiMehBlank size={24} />{" "}
                {film.genres.map(({ name }) => name).join(", ")}
              </li>
            </ul>
            {film.adult && (
              <p
                style={{
                  fontSize: ".8em",
                  display: "flex",
                  gap: ".5em",
                  alignItems: "center",
                }}
              >
                <TbRating18Plus size={48} color="red" /> Interdis aux moins de
                18 ans
              </p>
            )}
            <p className={styles["overview"]}>{film.overview}</p>
          </div>
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
