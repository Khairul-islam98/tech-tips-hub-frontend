'use client'
import { useGetAllUsers } from '@/hooks/user-hook';
import React from 'react';
import DataTable from './components/data-table';
import { columns } from './components/columns';
import AddUser from './components/add-user';

const ManageUsers = () => {
    
    const {data, refetch} = useGetAllUsers()
    const getAllUser = data?.data?.filter((user: any) => user.role === 'user')



    return (
        <div>
           <AddUser refetch={refetch} />
           <DataTable columns={columns} data={getAllUser}  />
        </div>
    );
};

export default ManageUsers;