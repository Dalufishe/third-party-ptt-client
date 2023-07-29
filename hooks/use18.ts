import { useRouter } from "next/router";
import { useState, useLayoutEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import setIs18 from "../redux/actions/setIs18.act";

const use18 = (condition: boolean): any => {
  const router = useRouter();

  const dispatch = useDispatch();
  const is18Aready = useSelector((state: any) => state.is18);

  const [need18, setNeed18] = useState(false);

  useLayoutEffect(() => {
    if (!is18Aready) {
      if (condition) {
        setNeed18(true);
      }
    }
  }, []);

  const handleIs18 = useCallback(() => {
    setNeed18(false);
    dispatch(setIs18());
  }, []);

  const handleIsNot18 = useCallback(() => {
    router.push("/");
  }, []);

  return [need18, handleIs18, handleIsNot18];
};

export default use18;
