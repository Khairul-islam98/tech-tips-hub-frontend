import { createPost } from "@/services/post-services";
import { IPost } from "@/types";
import { useMutation } from "@tanstack/react-query";
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
