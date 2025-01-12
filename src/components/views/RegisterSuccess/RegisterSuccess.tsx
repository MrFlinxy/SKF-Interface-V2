import { Button } from "@nextui-org/react";
import Link from "next/link";

const RegisterSuccess = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold text-primary-500">
            Berhasil Mendaftarkan Akun
          </h1>
          <p className="text-md text-accent-800 font-bold">
            Silahkan cek email anda untuk verifikasi akun anda
          </p>
          <p className="text-accent-900 text-sm font-semibold">
            Pastikan untuk mengecek email spam anda
          </p>
          <Link href="/auth/login">
            <Button className="text-text-50 m-5 bg-primary-500 font-bold hover:text-default-900">
              Masuk
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterSuccess;
