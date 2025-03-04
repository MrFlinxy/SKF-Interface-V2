import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import useRegister from "./useRegister";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import cn from "@/utils/cn";
import DarkTheme from "@/components/commons/DarkTheme";

const Register = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();
  const variant = "underlined";
  const placement = "inside";

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:w-1/3">
        <div className="w-2/3 text-center text-3xl font-bold text-primary-500 lg:w-full">
          <p className="text-7xl">Server</p>
          <p className="text-[44px]">Kimia Fisik</p>
        </div>
        <DarkTheme />
      </div>
      <Card>
        <CardBody className="p-8">
          <h2 className="text-2xl font-bold text-primary-500">Daftar Akun</h2>
          <p className="mb-4 mt-2 text-small" tabIndex={-1}>
            Sudah punya akun?&nbsp;
            <Link
              href="/auth/login"
              className="font-semibold text-primary-500"
              tabIndex={-1}
            >
              Masuk disini!
            </Link>
          </p>
          {errors.root && (
            <p className="mb-2 font-medium text-primary-500">
              {errors?.root?.message}
            </p>
          )}
          <form
            className={cn(
              "flex w-80 flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
            onSubmit={handleSubmit(handleRegister)}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Nama Lengkap"
                  variant={variant}
                  labelPlacement={placement}
                  placeholder="Nama Lengkap"
                  autoComplete="off"
                  isInvalid={errors.name !== undefined}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  label="Email"
                  variant={variant}
                  labelPlacement={placement}
                  placeholder="email@email.com"
                  autoComplete="off"
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              name="npm"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  label="Nomor Pokok Mahasiswa"
                  variant={variant}
                  labelPlacement={placement}
                  placeholder="140210190000"
                  autoComplete="off"
                  isInvalid={errors.npm !== undefined}
                  errorMessage={errors.npm?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.password ? "text" : "password"}
                  label="Kata Sandi"
                  variant={variant}
                  labelPlacement={placement}
                  placeholder="Kata Sandi"
                  autoComplete="off"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                      tabIndex={-1}
                    >
                      {visiblePassword.password ? (
                        <FaEye
                          className="pointer-events-none text-xl text-default-400"
                          tabIndex={-1}
                        />
                      ) : (
                        <FaEyeSlash
                          className="pointer-events-none text-xl text-default-400"
                          tabIndex={-1}
                        />
                      )}
                    </button>
                  }
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              name="passwordConfirmation"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={
                    visiblePassword.passwordConfirmation ? "text" : "password"
                  }
                  label="Konfirmasi Kata Sandi"
                  variant={variant}
                  labelPlacement={placement}
                  placeholder="Konfirmasi Kata Sandi"
                  autoComplete="off"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() =>
                        handleVisiblePassword("passwordConfirmation")
                      }
                      tabIndex={-1}
                    >
                      {visiblePassword.passwordConfirmation ? (
                        <FaEye
                          className="pointer-events-none text-xl text-default-400"
                          tabIndex={-1}
                        />
                      ) : (
                        <FaEyeSlash
                          className="pointer-events-none text-xl text-default-400"
                          tabIndex={-1}
                        />
                      )}
                    </button>
                  }
                  isInvalid={errors.passwordConfirmation !== undefined}
                  errorMessage={errors.passwordConfirmation?.message}
                />
              )}
            />

            <Button
              className="bg-primary-500 font-semibold text-default-50 hover:text-default-900"
              size="lg"
              type="submit"
            >
              {isPendingRegister ? (
                <Spinner color="white" size="md" />
              ) : (
                "Daftar"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default Register;
