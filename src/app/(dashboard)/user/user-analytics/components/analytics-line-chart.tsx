import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface AnalyticsLineChartProps {
    title: string;
    label: string;
    postData: { month: string; desktop: number }[];
    header: string;
}

export const AnalyticsLineChart = ({title, header, postData, label}: AnalyticsLineChartProps) => {
    const chartConfig = {
        desktop: {
            label: label,
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;
    return (
        <Card className="h-[450px] w-[90%] border md:w-[80%] rounded-lg shadow-lg overflow-hidden">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {header}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <ChartContainer className="h-[300px] w-full" config={chartConfig}>
                    <AreaChart
                        data={postData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid className='mt-10 mr-20' vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            className='mt-10 mr-20'
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            className='mt-10 mr-20'
                            dataKey="desktop"
                            type="natural"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

