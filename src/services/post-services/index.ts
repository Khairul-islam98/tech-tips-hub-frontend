import axiosInstance from "@/lib/axios-instance";
import { IPost } from "@/types";

// create post
export const createPost = async (userData: IPost) => {
  try {
    const { data } = await axiosInstance.post("/posts", userData);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// get all posts
export const getAllPosts = async () => {
  try {
    const { data } = await axiosInstance.get("/posts");
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
// get single post
export const getSinglePost = async (postId: any) => {
  try {
    const { data } = await axiosInstance.get(`/posts/${postId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// update post
export const updatePost = async (postId: any, userData: any) => {
  try {
    const { data } = await axiosInstance.put(`/posts/${postId}`, userData);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// delete post
export const deletePost = async (postId: any) => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${postId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// get my post
export const getMyPost = async (email: any) => {
  try {
    const { data } = await axiosInstance.get(`/posts/my-post/${email}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// create post upvote
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

// create post downvote
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
