import { useState } from "react";

export default function useOpen(defaultValue: boolean = false) {
  const [isOpen, setOpen] = useState<boolean>(defaultValue);

  const open = () => setOpen(true);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return {
    isOpen,
    open,
    toggle,
    close,
  };
}
