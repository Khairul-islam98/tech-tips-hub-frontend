import {
  createFollow,
  createUnfollow,
  deleteUser,
  getAllUsers,
  getMyProfile,
  updateProfile,
  updateUser,
} from "@/services/user-services";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["GET_ALL_USER"],
    queryFn: async () => await getAllUsers(),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async ({ id, userData }: { id: string; userData: any }) => {
      const result = await updateUser(id, userData);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_USER"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async (id: string) => await deleteUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_USER"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

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
