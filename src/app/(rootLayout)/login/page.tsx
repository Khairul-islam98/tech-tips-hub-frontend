/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { TriangleAlert } from "lucide-react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useUserLogin } from "@/hooks/auth";
import Link from "next/link";
import { useUser } from "@/context/user-provider";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const {setIsLoading} = useUser()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      handleUserLogin(data);
      setIsLoading(true)
    } catch (err: any) {
      setError(err?.data?.message || "Failed to login. Please try again.");
    }
  };
  return (
    <div className="h-full flex items-center justify-center bg-[#5C3B58]">
      <div className="md:h-auto md:w-[420px]">
        <Card className="w-full h-full p-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle> Login to continue</CardTitle>
            <CardDescription>
              Use your email or another service to continue
            </CardDescription>
          </CardHeader>

          {!!error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
              <TriangleAlert className="w-4 h-4" />
              <p>{error}</p>
            </div>
          )}

          <CardContent className="space-y-5 px-0 pb-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className="w-full"
                    required
                  />
                )}
              />
              {errors.email && typeof errors.email.message === "string" && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <div className="relative">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={`${isShowPassword ? "text" : "password"}`}
                      placeholder="Password"
                      className="w-full"
                      required
                    />
                  )}
                />
                <p
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer p-1"
                >
                  {isShowPassword ? <IoEye /> : <IoEyeOff />}
                </p>
              </div>
              {errors.password &&
                typeof errors.password.message === "string" && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              
              <Button type="submit" className="w-full" size="lg">
                Continue
              </Button>

              <p>
                <Link
                  href="/forget-password"
                  className="text-gray-600 hover:underline flex justify-center"
                >
                  Forgot Password?
                </Link>
              </p>
            </form>

            <Separator />

            <div className="flex flex-col gap-y-2.5">
              <Button
                onClick={() => {}}
                variant="outline"
                size="lg"
                className="w-full relative"
              >
                <FcGoogle className="w-5 h-5 absolute top-2.5 left-2.5" />
                Continue with Google
              </Button>
              <Button
                onClick={() => {}}
                variant="outline"
                size="lg"
                className="w-full relative"
              >
                <FaGithub className="w-5 h-5 absolute top-2.5 left-2.5" />
                Continue with Github
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href='/register' 
                className="text-sky-700 hover:underline cursor-pointer"
              >
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
