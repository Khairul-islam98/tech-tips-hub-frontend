import { getMyProfile, updateProfile } from "@/services/user-services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetMyProfile = (email: any) => {
  return useQuery({
    queryKey: ["GET_MY_PROFILE", email],
    queryFn: async () => await getMyProfile(email),
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: async ({
      email,
      userData,
    }: {
      email: string;
      userData: any;
    }) => {
      const result = await updateProfile(email, userData);
      return result;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
