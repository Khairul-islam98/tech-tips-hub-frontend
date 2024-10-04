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

interface UserId {
  userId: string; // Adjust based on your API requirements
}

// Function to create follow
// Adjust these to use `targetId` as expected by the API
export const createFollow = async ({
  userId,
  targetId, // Renamed to targetId
}: {
  userId: string;
  targetId: string;
}) => {
  try {
    const { data } = await axiosInstance.post("/users/follow", {
      userId,
      targetId, // Make sure this matches the API
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
  targetId, // Renamed to targetId
}: {
  userId: string;
  targetId: string;
}) => {
  try {
    const { data } = await axiosInstance.post("/users/unfollow", {
      userId,
      targetId, // Make sure this matches the API
    });
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
