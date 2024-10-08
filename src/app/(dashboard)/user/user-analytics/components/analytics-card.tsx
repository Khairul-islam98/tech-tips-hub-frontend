import { IoDocumentTextSharp } from 'react-icons/io5';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShareIcon, Vote } from 'lucide-react';
import { FaComment } from 'react-icons/fa';

interface AnalyticsCardProps {
   share : number;
   post: number;
   comment: number;
   voat: number
}

export const AnalyticsCard = ({share, post, comment, voat}: AnalyticsCardProps) => {
    return (
        <div className="grid w-[80%] gap-2 grid-cols-1 md:grid-cols-2 md:gap-3 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Post
                    </CardTitle>
                    <IoDocumentTextSharp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{post}</div>
                </CardContent>
               
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Share
                    </CardTitle>
                    <ShareIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{share}</div>
                </CardContent>
               
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Vote
                    </CardTitle>
                    <Vote className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{voat}</div>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Comment</CardTitle>
                    <FaComment className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{comment}</div>
                </CardContent>
            </Card>
        </div>
    );
};


