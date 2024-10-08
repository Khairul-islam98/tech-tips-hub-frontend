import {
  dailyAnalytics,
  monthlyAnalytics,
  weeklyAnalytics,
} from "@/services/analytics.services.ts";
import { useQuery } from "@tanstack/react-query";

export const useDailyAnalytics = (userId: any) => {
  return useQuery({
    queryKey: ["GET_DAILY_ANALYTICS"],
    queryFn: async () => await dailyAnalytics(userId),
  });
};
export const useWeeklyAnalytics = (userId: any) => {
  return useQuery({
    queryKey: ["GET_WEEKLY_ANALYTICS"],
    queryFn: async () => await weeklyAnalytics(userId),
  });
};
export const useMonthlyAnalytics = (userId: any) => {
  return useQuery({
    queryKey: ["GET_MONTHLY_ANALYTICS"],
    queryFn: async () => await monthlyAnalytics(userId),
  });
};
