import { getActivityLogs } from "@/services/activitylogs.services";
import { useQuery } from "@tanstack/react-query";

export const useGetActivityLogs = () => {
  return useQuery({
    queryKey: ["GET_ACTIVITY_LOGS"],
    queryFn: async () => await getActivityLogs(),
  });
};
