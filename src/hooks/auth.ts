import {
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
      toast.error(error.message);
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
    onError: (error) => {
      toast.error(error.message);
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
