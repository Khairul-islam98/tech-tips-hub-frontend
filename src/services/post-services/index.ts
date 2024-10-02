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
