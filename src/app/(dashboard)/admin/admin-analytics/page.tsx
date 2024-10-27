'use client'
import React from 'react';
import { AnalyticsCard } from './components/analytics-card';
import { PostChart } from './components/post-chart';
import MemberChart from './components/member-chart';

const AdminAnalytics = () => {
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <AnalyticsCard />

            <div className='flex items-center mt-10 gap-5 flex-col lg:flex-row'>
                <div className='w-full'>

                   <PostChart />
                </div>
                <div className='w-full'>
                    <MemberChart />
         
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;