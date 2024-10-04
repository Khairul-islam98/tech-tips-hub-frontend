import {
  createPost,
  createPostDownvote,
  createPostUpvote,
  getAllPosts,
  getSinglePost,
} from "@/services/post-services";
import { IPost } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
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
