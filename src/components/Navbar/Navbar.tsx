'use client';
import Link from "next/link";
import styles from "./navbar.module.scss";
import { HiHome } from "react-icons/hi";
import { GiFilmSpool } from "react-icons/gi";
import openModal from "components/Modals/SearchModal";


export const Navbar = () => {
  return (
    <nav className={styles["navBar"]}>
      <ul className={styles["items"]}>
        <li>
          <Link href="/">
            <span>
              <HiHome />
            </span>
            <span>Accueil</span>
          </Link>
        </li>
        <li>
          <Link href="/movies">
            <span>
              <GiFilmSpool />
            </span>
            <span>Films</span>
          </Link>
        </li>
      </ul>
      <SearchBar />
    </nav>
  );
};

function SearchBar() {
  return (
    <div className={styles["search-bar"]}>
      <input type="text" placeholder="Rechercher..." />
      <button onClick={() => openModal('search')} type="submit">Rechercher</button>
    </div>
  );
}
