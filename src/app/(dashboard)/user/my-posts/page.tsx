'use client';
import { useUser } from '@/context/user-provider';
import { useGetMyPost } from '@/hooks/post-hook';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import Loader from '@/components/loader';



const MyPosts = () => {
    const {user} = useUser();
    const {data, isLoading} = useGetMyPost(user?.email)

    const userData = data?.data

   
   if(isLoading) return <Loader />

    return (
        <div>
            <h1 className='font-bold text-2xl text-center mb-10'>My <span className='text-sky-500'>Posts</span></h1>
           <DataTable columns={columns} data={userData}  />
        </div>
    );
};

export default MyPosts;