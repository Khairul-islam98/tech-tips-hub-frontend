'use client'
import { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { useUserResetPassword } from '@/hooks/auth';

interface FormValues {
  email: string;
  newPassword: string;
}

const ResetPassword = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { mutateAsync: resetPassword, isSuccess } = useUserResetPassword();
  const searchParams = useSearchParams(); 
  const token = searchParams.get("token");
  console.log(token);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    if (token) {
      try {
        const res = await resetPassword({
          email: data.email,
          token,
          newPassword: data.newPassword,
        });
        console.log(res);
      } catch (error) {
        console.error('Error resetting password:', error);
      }
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="md:h-auto md:w-[420px]">
        <Card className="w-full h-full p-8">
          <CardHeader className="px-0 pt-0 text-center">
            <CardTitle> Forget Password</CardTitle>
            <CardDescription>
              Use your email to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 px-0 pb-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* email */}
              <div>
                <div className="grid w-full items-center gap-1.5 mb-2">
                  <Label htmlFor="email">Enter Your Email:</Label>
                  <Input
                    className="w-full focus-visible:ring-offset-0"
                    type="email"
                    id="email"
                    {...register('email', { required: 'Email is required' })}
                  />
                </div>
                {errors?.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                {/* password */}
                <div className="grid w-full items-center gap-1.5 mb-2 relative">
                  <Label htmlFor="password">Enter Your Password:</Label>
                  <Input
                    type={isShowPassword ? 'text' : 'password'}
                    id="password"
                    {...register('newPassword', { required: 'Password is required' })}
                    placeholder="Password"
                    className="w-full"
                  />
                  <p
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    className="absolute text-center mt-0 pt-6 right-2 top-1/2 transform -translate-y-1/2 cursor-pointer p-1"
                  >
                    {isShowPassword ? <IoEye /> : <IoEyeOff />}
                  </p>
                </div>
                {errors?.newPassword && (
                  <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
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

export default ResetPassword;
