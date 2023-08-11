import { useRouter } from "next/router";
import { useEffect } from "react";

const useRedirect = (route: string) => {
  const router = useRouter();

  useEffect(() => {
    router.push(route);
  }, [router]);
};

export default useRedirect