import { useEffect } from "react";

const useScroll = (el: any, cbdown: () => void, cbup: () => void) => {
  useEffect(() => {
    let lastPos = 0;
    const handler = () => {
      const currentPos = el.scrollTop;

      if (currentPos > lastPos) {
        // 往下滑
        cbdown();
      }
      // 往上滑
      else {
        cbup();
      }
      lastPos = currentPos;
    };
    el?.addEventListener("scroll", handler);
    return () => {
      el?.removeEventListener("scroll", handler);
    };
  }, [el]);
};

export default useScroll;
