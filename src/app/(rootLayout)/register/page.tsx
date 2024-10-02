
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
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { registrationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Link from "next/link";
import { useUserRegistration } from "@/hooks/auth";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { mutate: userRegistration, isSuccess } = useUserRegistration();
  const router = useRouter();


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const userData = {
        ...data,
      }
     userRegistration(userData);
      
    } catch (err: any) {
      setError(err?.data?.message || "An error occurred during registration.");
    }
  };

  // const handleGoogleSignIn = () => {
  //   signIn("google", { callbackUrl: "/" });
  // };
  if(isSuccess){
    router.push("/login")
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="md:h-auto md:w-[420px]">
        <Card className="w-full h-full p-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Sign up to continue</CardTitle>
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
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Name"
                    className="w-full"
                    required
                  />
                )}
              />
              {errors.name && typeof errors.name.message === "string" && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

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

              <div className="relative">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={`${isShowPassword ? "text" : "password"}`}
                      placeholder="Confirm Password"
                      className="w-full"
                      required
                    />
                  )}
                />
                <p
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2  cursor-pointer p-1"
                >
                  {isShowPassword ? <IoEye /> : <IoEyeOff />}
                </p>
              </div>
              {errors.confirmPassword &&
                typeof errors.confirmPassword.message === "string" && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}

              <div className="flex items-center space-x-2">
                <Controller
                  name="checkbox"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="terms"
                      {...field}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="dark:border-black"
                    />
                  )}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-600"
                >
                  Accept terms and conditions
                </label>
              </div>
              {errors.checkbox &&
                typeof errors.checkbox.message === "string" && (
                  <p className="text-red-500 text-sm">
                    {errors.checkbox.message}
                  </p>
                )}

              <Button type="submit" className="w-full" size="lg">
                Continue
              </Button>
            </form>

            <Separator />

            <div className="flex flex-col gap-y-2.5">
              <Button
                onClick={() => {signIn("google", { callbackUrl: "/" })}}
                variant="outline"
                size="lg"
                className="w-full relative"
              >
                <FcGoogle className="w-5 h-5 absolute top-2.5 left-2.5" />
                Continue with Google
              </Button>
              <Button
                onClick={() => {
                  console.log("Github sign in clicked");
                }}
                variant="outline"
                size="lg"
                className="w-full relative"
              >
                <FaGithub className="w-5 h-5 absolute top-2.5 left-2.5" />
                Continue with Github
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Already have an account?{" "}
              <Link
                href={'/login'}
                className="text-sky-700 hover:underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
