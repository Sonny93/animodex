import { TMDB_IMAGE_BASE_URL } from "constants/api";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ film }: { film: SearchResult }) => {
  return (
    <Link href={`/movies/${film.id}`} className="Card">
      <div className="card-header">
        <div style={{ width: "280px", height: "350px", position: "relative" }}>
          <Image src={TMDB_IMAGE_BASE_URL + film.poster_path} alt="Card" fill />
        </div>
      </div>
      <div className="card-body">
        <h4>{film.title}</h4>
      </div>
    </Link>
  );
};

export default MovieCard;
