import { useRouter } from "next/router";

const Result = () => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <div>Result</div>;
};
export default Result;
