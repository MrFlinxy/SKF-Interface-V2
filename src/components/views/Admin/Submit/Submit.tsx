import Link from "next/link";
import { useRouter } from "next/router";

const Submit = () => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="flex flex-col">
          <Link href="/admin/submit/gaussian">Gaussian</Link>
          <Link href="/admin/submit/orca">Orca</Link>
          <Link href="/admin/submit/orcanebts">Orca NEBTS</Link>
        </div>
      </div>
    </div>
  );
};
export default Submit;
