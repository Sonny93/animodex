import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import styles from "./modal.module.scss";

interface ModalProps {
  close?: (...args: any) => void | Promise<void>;
  children: ReactNode;
}
export default function Modal({ close, children }: ModalProps) {
  const handleWrapperClick = (event) =>
    event.target.classList?.[0] === styles["modal-wrapper"] && close();

  return createPortal(
    <motion.div
      className={styles["modal-wrapper"]}
      onClick={handleWrapperClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1, delay: 0.1 } }}
    >
      <motion.div
        className={styles["modal-container"]}
        style={{ padding: '"1em 1.5em"' }}
        initial={{ opacity: 0, y: "-6em" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-6em", transition: { duration: 0.1 } }}
      >
        {children}
      </motion.div>
    </motion.div>,
    document.body
  );
}
