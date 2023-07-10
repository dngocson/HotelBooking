import { useEffect, useRef } from "react";

export function useOutsideClick(
  handler: () => void,
  listenCaputring: boolean = true
) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    }
    document.addEventListener("click", handleClick, listenCaputring);
    return () =>
      document.removeEventListener("click", handleClick, listenCaputring);
  }, [handler, listenCaputring]);
  return ref;
}
