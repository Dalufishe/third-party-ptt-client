import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex w-full justify-center mt-3">
      <AiOutlineLoading3Quarters className="animate-spin text-text2 text-2xl" />
    </div>
  );
};

export default Loading;
