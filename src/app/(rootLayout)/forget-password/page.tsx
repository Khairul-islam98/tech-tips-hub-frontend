"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserForgetPassword } from "@/hooks/auth";

const ForgetPassword = () => {
  const {mutate: forgetPassword} = useUserForgetPassword()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
      try{
        forgetPassword(data)
      }catch(error){
        console.log(error);
      }
  };
  return (
    <div className="h-full flex items-center justify-center ">
      <div className="md:h-auto md:w-[420px]">
        <Card className="w-full h-full p-8">
          <CardHeader className="px-0 pt-0 text-center">
            <CardTitle> Forget Password</CardTitle>
            <CardDescription>
              Use your email continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 px-0 pb-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* email */}
              <div>
                <div className="grid w-full items-center gap-1.5  mb-2">
                  <Label htmlFor="email">Enter Your Email:</Label>
                  <Input
                    className="w-full focus-visible:ring-offset-0"
                    type="email"
                    id="email"
                    {...register("email", { required: true })}
                  />
                </div>
                {errors?.email && (
                  <p className="text-red-500 text-sm">Email is required</p>
                )}
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgetPassword;
