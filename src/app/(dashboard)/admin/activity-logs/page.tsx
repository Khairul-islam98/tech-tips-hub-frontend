'use client'
import Loader from "@/components/loader";
import { useGetActivityLogs } from "@/hooks/activitylogs-hook";
import { motion } from "framer-motion";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";


const ActivityLogs = () => {

    const {data, isLoading} = useGetActivityLogs();

    const activityLogs = data?.data

    if (isLoading) return <Loader />;

    return (
        <div>
        <motion.h1 
            className="text-center font-bold text-2xl mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            Activity <span className="text-sky-500">Logs</span>
        </motion.h1>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <DataTable columns={columns} data={activityLogs} />
        </motion.div>
    </div>
    );
};

export default ActivityLogs;