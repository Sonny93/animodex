import Link from "next/link";

import styles from "./search-modal.module.scss";

export default function SearchResultList({
  results,
  handleModalClose,
}: {
  results: Movie[];
  handleModalClose: (event: any) => void;
}) {
  return (
    <ul className={styles["search-result-list"]}>
      {results.map((result) => (
        <li key={result.id}>
          <Link href={`/movies/${result.id}`} onClick={handleModalClose}>
            {result.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
