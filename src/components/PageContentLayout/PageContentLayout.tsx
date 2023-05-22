import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

import Loader from "components/Loader/Loader";

import styles from "./page-content.module.scss";

export default function PageContentLayout({
  children,
  noMargin = false,
}: {
  children: ReactNode;
  noMargin?: boolean;
}) {
  const isTransitioning = usePageLoader();
  return (
    <motion.main
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={styles["page-content-layout"]}
      style={noMargin ? { marginTop: "0" } : {}}
    >
      {children}
      {isTransitioning && <Loader label="Chargement de la page" />}
    </motion.main>
  );
}

function usePageLoader() {
  const router = useRouter();
  const [isTransitioning, setTransitioning] = useState<boolean>(false);

  const handleTransitioning = () => setTransitioning(true);
  const handleStopTransitioning = () => setTransitioning(false);

  useEffect(() => {
    router.events.on("routeChangeStart", handleTransitioning);
    router.events.on("routeChangeComplete", handleStopTransitioning);
    router.events.on("routeChangeError", handleStopTransitioning);

    return () => {
      router.events.off("routeChangeStart", handleTransitioning);
      router.events.off("routeChangeComplete", handleStopTransitioning);
      router.events.off("routeChangeError", handleStopTransitioning);
    };
  });

  return isTransitioning;
}
