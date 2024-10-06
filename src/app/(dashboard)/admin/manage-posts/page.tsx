'use client'

import { useGetAllPosts } from "@/hooks/post-hook";
import DataTable from "./components/data-table";
import { columns } from "./components/columns";

const ManagePosts = () => {
    const { data } = useGetAllPosts();
    const allPost = data?.data;


    return (
        <div>
            <DataTable columns={columns} data={allPost} />      
        </div>
    );
};

export default ManagePosts;