'use client'

import Loader from "@/components/loader";
import { useUser } from "@/context/user-provider";
import { useGetMyPayment } from "@/hooks/payment-hook";

const UserPayment = () => {
    const {user} = useUser()

    const {data: myPayment, isLoading} = useGetMyPayment(user?.email)

    if(isLoading) return <Loader />

    console.log(myPayment);

    return (
        <div className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center">
            {myPayment?.data.length === 0 ? <h1 className="text-2xl text-center col-span-4">No Payment Found</h1> : myPayment?.data?.map((payment: { _id: string, amount: number, status: string, createdAt: string }) => (
                <div key={payment._id} className="p-4 border rounded">
                    <h2 className="text-sm font-bold">Payment ID: {payment._id}</h2>
                    <p>Amount: ${payment.amount}</p>
                    <p>Status: {payment.status}</p>
                    <p>Date: {new Date(payment.createdAt).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default UserPayment;