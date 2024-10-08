'use client'

import { useGetAllPosts } from "@/hooks/post-hook";
import DataTable from "./components/data-table";
import { columns } from "./components/columns";
import { AddPost } from "./components/add-post";
import Loader from "@/components/loader";
import { motion } from "framer-motion";

const ManagePosts = () => {
    const { data, refetch, isLoading } = useGetAllPosts({ searchTerm: "", category: "", sort: "" });
    const allPost = data?.data;

    if (isLoading) return <Loader />;
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <AddPost refetch={refetch} />
            </motion.div>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <DataTable columns={columns} data={allPost} />      
            </motion.div>
        </motion.div>
    );
};

export default ManagePosts;
