'use client';

import { useUser } from "@/context/user-provider";
import { AnalyticsCard } from "./analytics-card";
import { AnalyticsLineChart } from "./analytics-line-chart";
import { useDailyAnalytics, useWeeklyAnalytics } from "@/hooks/analytics.hook";
import { AnalyticsBarChart } from "./analytics-bar-chart";




export const DailyAnalytics = () => {
  const {user} = useUser()
  const {data} = useDailyAnalytics(user?._id)
  const {data: weeklyData} = useWeeklyAnalytics(user?._id)
    const countNumber = data?.data
    console.log(weeklyData);
    const postData = weeklyData?.data?.map((item: { day: string, totalPosts: number }) => ({
        month: item.day,
        desktop: item.totalPosts,
    })) || [];
    const commentData = weeklyData?.data?.map((item: { day: string, totalComments: number }) => ({
        month: item.day,
        desktop: item.totalComments,
    })) || [];
    const totalReactions = weeklyData?.data?.map((item: { day: string, totalReactions: number }) => ({
        month: item.day,
        desktop: item.totalReactions,
    })) || [];
    return (
        <div className="mt-6">
            <main className="flex flex-1 flex-col gap-4 md:gap-8">
                <AnalyticsCard share={0} voat={countNumber?.totalReactions} post={countNumber?.postCount} comment={countNumber?.commentCount}  />

            </main>
            <div className='mt-4'>
                <AnalyticsLineChart title='Post Chart' label='post' header='Showing total Post for the last 5 week' postData={postData} />
            </div>
            <div className='mt-5 mb-8 flex items-center flex-col lg:flex-row gap-5'>
                <div className='mt-4 lg:w-1/2 w-full'>
                    <AnalyticsBarChart title='Comment Chart' label='Comment' header='Showing total comment  week' postData={commentData} />
                </div>
                <div className='mt-4 lg:w-1/2 w-full'>
                    <AnalyticsLineChart title='Total Reactions' label='Total Reactions' header='Showing total reactions  week' postData={totalReactions} />
                </div>
            </div>
        </div>
    );
};

