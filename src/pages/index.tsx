import MovieCard from "components/MovieCard/MovieCard";
import PageContentLayout from "components/PageContentLayout/PageContentLayout";
import { SearchApi } from "lib/search";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "styles/page.module.scss";
import "swiper/css";
import "swiper/css/pagination";

export default function Home({ genres }: { genres: Genre[] }) {
  return (
    <PageContentLayout>
      <h1>Animodex</h1>
      <p>Vos séries préférées à portée de main.</p>
      <div className={styles["movies"]}>
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
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {genre.movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard film={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export async function getServerSideProps() {
  const searchApi = new SearchApi();
  const { genres } = await searchApi.getGenres();
  return {
    props: {
      genres: await Promise.all(
        genres.map((genre) =>
          searchApi
            .getMoviesByGenre(genre.id)
            .then(({ results }) => ({ ...genre, movies: results }))
        )
      ),
    },
  };
}
