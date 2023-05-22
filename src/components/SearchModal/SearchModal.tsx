import { AnimatePresence } from "framer-motion";
import { ChangeEvent, useEffect, useState } from "react";

import Modal from "components/Modal/Modal";
import SearchResultList from "./SearchResultList";

import { DEBOUNCE_TIME } from "constants/debounce";
import useAutoFocus from "hooks/useAutoFocus";
import useOpen from "hooks/useOpen";
import { BaseApi } from "lib/api";

import styles from "./search-modal.module.scss";

export default function SearchBar() {
  const autoFocus = useAutoFocus();
  const { isOpen, open, close } = useOpen();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim() === "") return;

      // il ne faut pas utiliser l'api key côté client donc on utilise
      // une route api pour faire des recherches (pages/api/search)
      const api = new BaseApi(window.location.origin);
      const { results } = await api.request(
        "/api/search?term=" + searchTerm,
        false
      );

      setResults(results);
    }, DEBOUNCE_TIME);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleModalOpen = (event) => {
    event.preventDefault();
    open();
    document.body.style.overflowY = "hidden";
  };

  const handleModalClose = () => {
    close();
    setSearchTerm("");
    setResults([]);
    document.body.style.overflowY = "auto";
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  return (
    <div className={styles["search-bar"]}>
      <input
        type="text"
        placeholder="Rechercher..."
        onClick={handleModalOpen}
      />
      <AnimatePresence>
        {isOpen && (
          <Modal close={handleModalClose}>
            <input
              type="text"
              placeholder="Rechercher..."
              onClick={(event) => {
                event.preventDefault();
                open();
              }}
              onChange={handleInputChange}
              value={searchTerm}
              ref={autoFocus}
              style={{ width: "100%" }}
            />
            {results.length > 0 ? (
              <SearchResultList
                handleModalClose={handleModalClose}
                results={results}
              />
            ) : searchTerm.trim().length === 0 ? (
              <i>Faites une recherche</i>
            ) : (
              <i>Aucun résultat</i>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
