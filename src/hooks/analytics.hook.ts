import {
  adminAnlayticsCount,
  adminAnlayticsPayments,
  adminAnlayticsPosts,
  dailyAnalytics,
  monthlyAnalytics,
  weeklyAnalytics,
} from "@/services/analytics.services.ts";
import { useQuery } from "@tanstack/react-query";

export const useAdminAnalyticsCount = () => {
  return useQuery({
    queryKey: ["GET_ADMIN_ANALYTICS"],
    queryFn: async () => await adminAnlayticsCount(),
  });
};
export const useAdminAnalyticsPosts = () => {
  return useQuery({
    queryKey: ["GET_ADMIN_ANALYTICS_POSTS"],
    queryFn: async () => await adminAnlayticsPosts(),
  });
};
export const useAdminAnalyticsPayment = () => {
  return useQuery({
    queryKey: ["GET_ADMIN_ANALYTICS_POSTS"],
    queryFn: async () => await adminAnlayticsPayments(),
  });
};
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
