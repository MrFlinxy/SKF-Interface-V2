import Link from "next/link";

const Submit = () => {
  return (
    <div>
      <div>
        <div className="flex flex-col">
          <Link href="/admin/submit/gaussian">Gaussian</Link>
          <Link href="/admin/submit/orca">Orca</Link>
        </div>
      </div>
    </div>
  );
};
export default Submit;
