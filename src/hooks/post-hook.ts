import {
  createPost,
  createPostDownvote,
  createPostUpvote,
  deletePost,
  getAllPosts,
  getMyPost,
  getSinglePost,
  updatePost,
} from "@/services/post-services";
import { IPost } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePost = () => {
  return useMutation<any, Error, IPost>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (userData) => await createPost(userData),
    onSuccess: () => {
      toast.success("Create Post successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["GET_ALL_POSTS"],
    queryFn: async () => await getAllPosts(),
  });
};

export const useGetSinglePost = (postId: any) => {
  return useQuery({
    queryKey: ["GET_SINGLE_POST", postId],
    queryFn: async () => await getSinglePost(postId),
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async ({ id, userData }: { id: string; userData: any }) => {
      const result = await updatePost(id, userData);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_POSTS"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (id: string) => await deletePost(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_POSTS"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetMyPost = (email: any) => {
  return useQuery({
    queryKey: ["GET_MY_POST", email],
    queryFn: async () => await getMyPost(email),
  });
};

export const useCreateUpvote = () => {
  return useMutation({
    mutationKey: ["CREATE_UPVOTE"],
    mutationFn: async ({
      postId,
      userId,
      cancel = false, // Add cancel parameter to handle canceling upvotes
    }: {
      postId: string;
      userId: string;
      cancel?: boolean;
    }) => {
      await createPostUpvote(postId, userId, cancel);
    },
    onSuccess: (_, { cancel }) => {
      toast.success(cancel ? "Upvote canceled." : "Upvoted successfully.");
    },
    onError: (error: any) => {
      toast.error(`Failed to upvote: ${error.message}`);
    },
  });
};

export const useCreateDownvote = () => {
  return useMutation({
    mutationKey: ["CREATE_DOWNVOTE"],
    mutationFn: async ({
      postId,
      userId,
      cancel = false, // Add cancel parameter to handle canceling downvotes
    }: {
      postId: string;
      userId: string;
      cancel?: boolean;
    }) => {
      await createPostDownvote(postId, userId, cancel);
    },
    onSuccess: (_, { cancel }) => {
      toast.success(cancel ? "Downvote canceled." : "Downvoted successfully.");
    },
    onError: (error: any) => {
      toast.error(`Failed to downvote: ${error.message}`);
    },
  });
};
