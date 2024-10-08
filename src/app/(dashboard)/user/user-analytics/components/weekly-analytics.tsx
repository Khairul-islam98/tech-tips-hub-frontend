'use client'

import { useUser } from "@/context/user-provider";
import { AnalyticsCard } from "./analytics-card";
import { useWeeklyAnalytics } from "@/hooks/analytics.hook";
import { AnalyticsLineChart } from "./analytics-line-chart";
import { AnalyticsBarChart } from "./analytics-bar-chart";


export const WeeklyAnalytics = () => {
    const {user} = useUser()

    const {data: weeklyData} = useWeeklyAnalytics(user?._id)

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
                <AnalyticsCard share={0} voat={weeklyData?.data?.totalReactions || 0} post={weeklyData?.data?.totalPosts || 0} comment={weeklyData?.data?.totalComments || 0} />

            </main>
            <div className='mt-4'>
                <AnalyticsLineChart title='Post Chart' label='post' header='Showing total Post week' postData={postData} />
            </div>
            <div className='mt-5 mb-8 flex items-center flex-col lg:flex-row gap-5'>
                <div className='mt-4 lg:w-1/2 w-full'>
                    <AnalyticsBarChart title='Comment Chart' label='Comment' header='Showing total comment  week' postData={commentData} />
                </div>
                <div className='mt-4 lg:w-1/2 w-full'>
                    <AnalyticsLineChart title='Total Reactions Chart' label='totalReactions' header='Showing total reactions for the last 5 week' postData={totalReactions} />
                </div>
            </div>
        </div>
    );
};

