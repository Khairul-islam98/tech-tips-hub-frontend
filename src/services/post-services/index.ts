import axiosInstance from "@/lib/axios-instance";
import { IPost } from "@/types";

export const createPost = async (userData: IPost) => {
  try {
    const { data } = await axiosInstance.post("/posts", userData);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
