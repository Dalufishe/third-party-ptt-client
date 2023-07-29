import { useState, useEffect } from "react";

const useScrollMemo = (el: Element | null) => {
  const [h, setH] = useState(0);
  useEffect(() => {
    const handler = () => {
      setH(el?.scrollTop || 0);
    };

    el?.addEventListener("scroll", handler);
    return () => {
      el?.removeEventListener("scroll", handler);
    };
  }, [el]);
  return h;
};

export default useScrollMemo;
