import axiosInstance from "@/lib/axios-instance";

export const dailyAnalytics = async (userId: any) => {
  try {
    const { data } = await axiosInstance.get(`/analytics/daily/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const weeklyAnalytics = async (userId: any) => {
  try {
    const { data } = await axiosInstance.get(`/analytics/weekly/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const monthlyAnalytics = async (userId: any) => {
  try {
    const { data } = await axiosInstance.get(`/analytics/monthly/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
