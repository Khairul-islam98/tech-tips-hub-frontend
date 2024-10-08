import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminAnalyticsCount } from '@/hooks/analytics.hook';
import { Activity, DollarSign, Users } from 'lucide-react';

export const AnalyticsCard = () => {
    const {data, isLoading} = useAdminAnalyticsCount()

    if(isLoading) return null
    return (
        <div className="grid gap-4 w-[80%] md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                ${data?.data?.totalRevenue}
            </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Posts</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                 {data?.data?.post}
            </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">All User</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {data?.data?.user}
            </CardContent>
        </Card>
    </div>
    );
};

