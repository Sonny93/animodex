import Image from "next/image";
import { CgSpinnerAlt } from "react-icons/cg";

import { motion } from "framer-motion";
import styles from "./loader.module.scss";

interface LoaderProps {
  label: string;
  size?: number;
  fixedPos?: boolean;
}
export default function Loader({
  label = "Chargement",
  size = 40,
  fixedPos = true,
}: LoaderProps) {
  const logoSize = size * 0.75;
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={`${styles["loader"]} ${fixedPos ? styles["fixed-pos"] : ""}`}
    >
      <div className={styles["loader-logo"]}>
        <SpinnerIcon size={size} />
        <Image
          src="/vercel.svg"
          alt="Logo Spinner"
          height={logoSize}
          width={logoSize}
        />
      </div>
      <p>{label}</p>
    </motion.div>
  );
}

function SpinnerIcon({ size }: { size: number }) {
  return (
    <div className={styles["spinner-icon"]}>
      <CgSpinnerAlt style={{ fontSize: size }} />
    </div>
  );
}
