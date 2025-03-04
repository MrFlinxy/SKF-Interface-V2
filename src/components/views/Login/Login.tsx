import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import useLogin from "./useLogin";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import cn from "@/utils/cn";
import DarkTheme from "@/components/commons/DarkTheme";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();
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
          <h2 className="text-2xl font-bold text-primary-500">Masuk</h2>
          <p className="mb-4 mt-2 text-small">
            Belum punya akun?&nbsp;
            <Link
              href="/auth/register"
              className="font-semibold text-primary-500"
            >
              Daftar disini!
            </Link>
          </p>
          {errors.root && (
            <p className="mb-2 font-medium text-danger">
              {errors?.root?.message}
            </p>
          )}
          <form
            className={cn(
              "flex w-80 flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
            onSubmit={handleSubmit(handleLogin)}
          >
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
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={isVisible ? "text" : "password"}
                  label="Kata Sandi"
                  variant={variant}
                  labelPlacement={placement}
                  placeholder="Kata Sandi"
                  autoComplete="off"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      tabIndex={-1}
                    >
                      {isVisible ? (
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
            <p className="mb-2 mt-2 text-end text-small" tabIndex={-1}>
              <Link
                href="/auth/resetpassword"
                className="font-semibold text-primary-500"
                tabIndex={-1}
              >
                Lupa password?
              </Link>
            </p>

            <Button
              size="lg"
              type="submit"
              className="bg-primary-500 font-semibold text-text-50 hover:text-text-900"
            >
              {isPendingLogin ? <Spinner color="white" size="md" /> : "Login"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default Login;
