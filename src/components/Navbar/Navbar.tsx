import React from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";

export const Navbar = () => {
  return (
    <div className={styles["navBar"]}>
      <nav>
        <Link href="/movies">Films</Link>
        <Link href="/categories">Catégories</Link>
      </nav>
      <div>
        <input type="text" placeholder="Rechercher..." />
        <button type="submit">Rechercher</button>
      </div>
    </div>
  );
};
