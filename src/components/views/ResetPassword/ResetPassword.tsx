import DarkTheme from "@/components/commons/DarkTheme";
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import cn from "@/utils/cn";
import { Controller } from "react-hook-form";
import useResetPassword from "./useResetPassword";
import Link from "next/link";

const ResetPassword = () => {
  const {
    control,
    handleSubmit,
    handleResetPassword,
    isPendingResetPassword,
    errors,
  } = useResetPassword();

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
          <h2 className="text-2xl font-bold text-primary-500">
            Reset Password
          </h2>
          <p tabIndex={-1} className="pt-2 font-semibold text-accent-500">
            <Link href="/auth/login" tabIndex={-1}>
              Back
            </Link>
          </p>
          {errors.root && (
            <p className="mb-2 font-medium text-primary-500">
              {errors?.root?.message}
            </p>
          )}
          <form
            className={cn(
              "flex w-80 flex-col pt-2",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
            onSubmit={handleSubmit(handleResetPassword)}
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

            <Button
              className="bg-primary-500 font-semibold text-default-50 hover:text-default-900"
              size="lg"
              type="submit"
            >
              {isPendingResetPassword ? (
                <Spinner color="white" size="md" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default ResetPassword;
