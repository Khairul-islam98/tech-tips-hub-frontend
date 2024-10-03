import {
  createPost,
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
