import {
  forgetPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "@/services/auth-services";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      if (error?.message) {
        toast.error(error.message || "Register failed.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),

    onSuccess: () => {
      toast.success("User login successful.");
    },
    onError: (error: any) => {
      if (error?.message) {
        toast.error(error.message || "Login failed.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });
};
export const useUserForgetPassword = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["FORGET_PASSWORD"],
    mutationFn: async (userData) => await forgetPassword(userData),
    onSuccess: () => {
      toast.success("Check your email for password reset link. .");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send forget link.");
    },
  });
};
export const useUserResetPassword = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["RESET_PASSWORD"],
    mutationFn: async (userData) => await resetPassword(userData),
    onSuccess: () => {
      toast.success("Password reset successful.");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to reset password.");
    },
  });
};
