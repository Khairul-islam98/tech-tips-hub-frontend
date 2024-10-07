'use client'
import { useGetAllUsers } from '@/hooks/user-hook';
import React from 'react';
import DataTable from './components/data-table';
import { columns } from './components/columns';
import AddUser from './components/add-user';
import { motion } from 'framer-motion';
import Loader from '@/components/loader';

const ManageUsers = () => {
    const { data, refetch, isLoading } = useGetAllUsers();
    const getAllUser = data?.data?.filter((user: any) => user.role === 'user');

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
                <AddUser refetch={refetch} />
            </motion.div>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <DataTable columns={columns} data={getAllUser} />
            </motion.div>
        </motion.div>
    );
};

export default ManageUsers;
