'use client'
import React from 'react';
import { AnalyticsCard } from './analytics-card';
import { useUser } from '@/context/user-provider';
import { useMonthlyAnalytics } from '@/hooks/analytics.hook';
import { AnalyticsLineChart } from './analytics-line-chart';
import { AnalyticsBarChart } from './analytics-bar-chart';



export const MonthlyAnalytics = () => {

    const {user} = useUser()

    const {data: monthlyData} = useMonthlyAnalytics(user?._id)


    const postData = monthlyData?.data?.map((item: { month: string, totalPosts: number }) => ({
        month: item.month,
        desktop: item.totalPosts,
    })) || [];
    const commentData = monthlyData?.data?.map((item: { month: string, totalComments: number }) => ({
        month: item.month,
        desktop: item.totalComments,
    })) || [];
    const totalReactions = monthlyData?.data?.map((item: { month: string, totalReactions: number }) => ({
        month: item.month,
        desktop: item.totalReactions,
    })) || [];

    



    return (
        <div className="mt-6">
            <main className="flex flex-1 flex-col gap-4 md:gap-8">
            <AnalyticsCard share={0} voat={monthlyData?.data?.totalReactions || 0} post={monthlyData?.data?.totalPosts || 0} comment={monthlyData?.data?.totalComments || 0} />

            </main>
            <div className='mt-4'>
                <AnalyticsLineChart title='Post Chart' label='post' header='Showing total Post for the month' postData={postData} />
            </div>
            <div className='mt-5 mb-8 flex items-center flex-col lg:flex-row gap-5'>
                <div className='mt-4 lg:w-1/2 w-full'>
                    <AnalyticsBarChart title='Comment Chart' label='Comment' header='Showing total comment for the month' postData={commentData} />
                </div>
                <div className='mt-4 lg:w-1/2 w-full'>
                    <AnalyticsLineChart title='Total Reactions Chart' label='Total Reactions' header='Showing total reactions for the month' postData={totalReactions} />
                </div>
            </div>
        </div>
    );
};

