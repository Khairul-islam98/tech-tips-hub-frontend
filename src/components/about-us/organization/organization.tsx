'use client'
import { motion } from "framer-motion";

const organization = {
    name: "Tech Tips Hub",
    mission: "Empowering developers by sharing knowledge, tutorials, and cutting-edge tips for web development, software engineering, and AI.",
    foundingYear: "Founded in 2024",
    description:
        "Our goal is to create a vibrant community where developers and tech enthusiasts can share, learn, and collaborate on innovative projects. From beginners to experts, everyone is welcome to contribute and grow together.",
    values: [
        "Community Collaboration",
        "Continuous Learning",
        "Innovation and Creativity",
        "Open Source Contribution",
        "Knowledge Sharing"
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", // Valid image URL
};

const Organization = () => {
    return (
        <div className="py-16 px-8 bg-gray-100">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <motion.img
                    src={organization.image}
                    alt={organization.name}
                    className="w-64 h-64 rounded-full mb-8 shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                />
                <motion.h2
                    className="text-3xl font-bold text-black mb-4 text-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {organization.name}
                </motion.h2>
                <motion.p
                    className="text-xl text-gray-600 text-center mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {organization.mission}
                </motion.p>
                <motion.p
                    className="text-lg text-gray-500 text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {organization.foundingYear}
                </motion.p>
                <motion.p
                    className="text-md text-gray-600 text-center mb-8 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    {organization.description}
                </motion.p>
                <motion.div
                    className="flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                >
                    {organization.values.map((value, index) => (
                        <motion.div
                            key={index}
                            className="bg-white shadow-lg rounded-lg p-4 w-48 text-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            <p className="font-semibold text-gray-700">{value}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Organization;
