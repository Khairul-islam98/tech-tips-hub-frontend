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
    throw new Error(error);
  }
};
