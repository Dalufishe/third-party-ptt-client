const getSiteURL = () => {
  return `${process.env.NEXT_PUBLIC_HOST}${
    process.env.NEXT_PUBLIC_PORT ? ":" + process.env.NEXT_PUBLIC_PORT : ""
  }`;
};

export default getSiteURL