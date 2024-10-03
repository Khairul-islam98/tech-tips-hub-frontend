import axiosInstance from "@/lib/axios-instance";
import { IComment } from "@/types";

export const createComment = async (userData: IComment) => {
  try {
    const { data } = await axiosInstance.post("/comments", userData);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getComment = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get(`/comments/${postId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/comments/${commentId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const editComment = async (commentId: string, content: string) => {
  try {
    const { data } = await axiosInstance.put(`/comments/${commentId}`, {
      content,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
