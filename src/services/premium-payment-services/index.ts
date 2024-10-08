import axiosInstance from "@/lib/axios-instance";
import { PremiumPayment } from "@/types";

export const premiumPayment = async (userData: PremiumPayment) => {
  try {
    const { data } = await axiosInstance.post(
      "/payment/initiate-payment",
      userData
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllPayments = async () => {
  try {
    const { data } = await axiosInstance.get("/payment");
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getMyPayments = async (userId: any) => {
  try {
    const { data } = await axiosInstance.get(`/payment/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
