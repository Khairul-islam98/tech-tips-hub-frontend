import axiosInstance from "@/lib/axios-instance";
import { IPost } from "@/types";

export const createPost = async (userData: IPost) => {
  try {
    const { data } = await axiosInstance.post("/posts", userData);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllPosts = async () => {
  try {
    const { data } = await axiosInstance.get("/posts");
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const getSinglePost = async (postId: any) => {
  try {
    const { data } = await axiosInstance.get(`/posts/${postId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const getMyPost = async (email: any) => {
  try {
    const { data } = await axiosInstance.get(`/posts/my-post/${email}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const createPostUpvote = async (
  postId: string,
  userId: string,
  cancel = false
) => {
  try {
    const { data } = await axiosInstance.post(`/posts/${postId}/upvote`, {
      userId,
      cancel,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const createPostDownvote = async (
  postId: string,
  userId: string,
  cancel = false
) => {
  try {
    const { data } = await axiosInstance.post(`/posts/${postId}/downvote`, {
      userId,
      cancel,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
