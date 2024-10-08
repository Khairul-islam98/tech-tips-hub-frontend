
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DailyAnalytics } from "./daily-analytics";
import { WeeklyAnalytics } from "./weekly-analytics";
import { MonthlyAnalytics } from "./monthly-analytics";

export const AnalyticsTab = () => {
    return (
        <div>
            <Tabs defaultValue="daily">
                <TabsList className="bg-gray-300">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                <TabsContent value="daily">
                    <DailyAnalytics />
                </TabsContent>
                <TabsContent value="weekly">
                    <WeeklyAnalytics />
                </TabsContent>
                <TabsContent value="monthly">
                    <MonthlyAnalytics />
                </TabsContent>
            </Tabs>
        </div>
    );
};

