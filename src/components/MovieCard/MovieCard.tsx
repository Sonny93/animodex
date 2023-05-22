import { TMDB_IMAGE_BASE_URL } from "constants/api";
import Image from "next/image";
import Link from "next/link";

import styles from "./movie-card.module.scss";

const MovieCard = ({ film }: { film: Movie }) => {
  return (
    <Link href={`/movies/${film.id}`} className={styles["movie-card"]}>
      <div className={styles["card-header"]}>
        <Image src={TMDB_IMAGE_BASE_URL + film.poster_path} alt="Card" fill />
      </div>
      <div className="card-body">
        <h4>{film.title}</h4>
      </div>
    </Link>
  );
};

export default MovieCard;
