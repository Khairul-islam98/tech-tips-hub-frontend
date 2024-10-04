import { useUser } from "@/context/user-provider";
import { useGetMyProfile } from "@/hooks/user-hook";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion"; // Import motion for animations

export const Followers = () => {
    const { user } = useUser();
    const { data: userData } = useGetMyProfile(user?.email);
    
    const followers = userData?.data?.followers || [];

    if (!followers.length) {
        return <p className="text-center text-gray-500">You have no followers yet.</p>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-8">Followers</h2>
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.6 }} 
            >
                {followers.map((follower: any, index: number) => (
                    <motion.div
                        key={follower.id}
                        className="group bg-gradient-to-b from-white to-gray-100 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center" // Added flex and items-center for centering
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 50 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ type: "spring", stiffness: 300, delay: index * 0.1, duration: 0.4 }} 
                    >
                        {/* Follower Info */}
                        <div className="flex flex-col items-center justify-center mx-auto text-center">
                            <motion.div
                                className="h-16 w-16 mb-4 flex items-center justify-center" 
                                whileHover={{ rotate: 360 }} 
                                transition={{ duration: 0.8 }} 
                            >
                                <Avatar>
                                    <AvatarImage
                                        src={follower.profilePhoto}
                                        alt={follower.name}
                                    />
                                    <AvatarFallback className="bg-gray-300 text-white text-2xl">
                                        {follower.name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                            </motion.div>

                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-500 transition duration-150">
                                {follower.name}
                            </h3>

                            {/* Action Buttons */}
                            <motion.button
                                className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition duration-200"
                                whileHover={{ scale: 1.1 }} // Button enlarges slightly on hover
                                transition={{ type: "spring", stiffness: 200 }} // Springy effect on hover
                            >
                                Follow Back
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};
