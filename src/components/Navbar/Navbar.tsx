import SearchBar from "components/SearchModal/SearchModal";
import Link from "next/link";
import styles from "./navbar.module.scss";

export const Navbar = () => {
  return (
    <nav className={styles["navBar"]}>
      <ul className={styles["items"]}>
        <li>
          <Link href="/">Animodex</Link>
        </li>
        <li>
          <Link href="/movies">Films</Link>
        </li>
      </ul>
      <SearchBar />
    </nav>
  );
};
