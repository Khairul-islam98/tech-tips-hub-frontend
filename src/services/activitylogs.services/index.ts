import axiosInstance from "@/lib/axios-instance";

export const getActivityLogs = async () => {
  try {
    const { data } = await axiosInstance.get(`/activity-logs`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
