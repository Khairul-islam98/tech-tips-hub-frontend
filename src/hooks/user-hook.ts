import {
  createFollow,
  createUnfollow,
  getMyProfile,
  updateProfile,
} from "@/services/user-services";

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

export const useUserFollow = () => {
  return useMutation<any, Error, { userId: string; targetId: string }>({
    mutationKey: ["CREATE_FOLLOW"],
    mutationFn: async ({ userId, targetId }) =>
      await createFollow({ userId, targetId }),
    onSuccess: () => {
      toast.success("Followed successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
// Hook to unfollow a user
export const useUserUnfollow = () => {
  return useMutation<any, Error, { userId: string; targetId: string }>({
    mutationKey: ["CREATE_UNFOLLOW"],
    mutationFn: async ({ userId, targetId }) =>
      await createUnfollow({ userId, targetId }),
    onSuccess: () => {
      toast.success("Unfollowed successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
