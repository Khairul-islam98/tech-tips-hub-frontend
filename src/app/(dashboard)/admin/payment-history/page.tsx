'use client'

import { useGetAllPayments } from "@/hooks/payment-hook";
import DataTable from "./components/components/data-table";
import { columns } from "./components/components/columns";
import { motion } from "framer-motion";
import Loader from "@/components/loader";

const PaymentHistory = () => {

    const { data, isLoading } = useGetAllPayments();
    const paymentsData = data?.data;

    if (isLoading) return <Loader />;

    return (
        <div>
            <motion.h1 
                className="text-center font-bold text-2xl mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Payment <span className="text-sky-500">History</span>
            </motion.h1>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <DataTable columns={columns} data={paymentsData} />
            </motion.div>
        </div>
    );
};

export default PaymentHistory;
