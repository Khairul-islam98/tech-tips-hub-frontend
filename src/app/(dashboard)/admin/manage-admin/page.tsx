'use client'
import { useGetAllUsers } from "@/hooks/user-hook";
import DataTable from "./components/data-table";
import { columns } from "./components/columns";
import { AddAdmin } from "./components/add-admin";


const ManageAdmin = () => {

    const {data, refetch} = useGetAllUsers()
    const getAllAdmin = data?.data?.filter((user: any) => user.role === 'admin')
    return (
        <div>
            <AddAdmin refetch={refetch} />
            <DataTable columns={columns} data={getAllAdmin}  />
        </div>
    );
};

export default ManageAdmin;