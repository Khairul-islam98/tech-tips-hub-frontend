import {
  createComment,
  deleteComment,
  editComment,
  getComment,
} from "@/services/comment-services";
import { IComment } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateComment = () => {
  return useMutation<any, Error, IComment>({
    mutationKey: ["CREATE_COMMENT"],
    mutationFn: async (userData) => await createComment(userData),
    onSuccess: () => {
      toast.success("Create comment successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetComment = (postId: string) => {
  return useQuery({
    queryKey: ["GET_COMMENT", postId],
    queryFn: async () => await getComment(postId),
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async (commentId: string) => {
      await deleteComment(commentId);
    },
    onSuccess: () => {
      toast.success("Comment deleted successfully.");
    },
    onError: (error: any) => {
      toast.error(`Failed to delete comment: ${error.message}`);
    },
  });
};

export const useEditComment = () => {
  return useMutation({
    mutationKey: ["EDIT_COMMENT"],
    mutationFn: async ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => {
      await editComment(commentId, content);
    },
    onSuccess: () => {
      toast.success("Comment edited successfully.");
    },
    onError: (error: any) => {
      toast.error(`Failed to edit comment: ${error.message}`);
    },
  });
};
