import axiosInstance from "@/lib/axios-instance";

export const getMyProfile = async (email: any) => {
  try {
    const { data } = await axiosInstance.get(`/users/profile/${email}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateProfile = async (email: string, userData: string) => {
  try {
    const { data } = await axiosInstance.put(
      `/users/profile/${email}`,
      userData
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const createFollow = async ({
  userId,
  targetId,
}: {
  userId: string;
  targetId: string;
}) => {
  try {
    const { data } = await axiosInstance.post("/users/follow", {
      userId,
      targetId,
    });
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Unfollow API call
export const createUnfollow = async ({
  userId,
  targetId,
}: {
  userId: string;
  targetId: string;
}) => {
  try {
    const { data } = await axiosInstance.post("/users/unfollow", {
      userId,
      targetId,
    });
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
