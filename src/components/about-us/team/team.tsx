'use client'
import { motion } from "framer-motion";

import team1 from "../../../../public/assets/images/team/team1.jpg";
import team2 from "../../../../public/assets/images/team/team2.png";
import team3 from "../../../../public/assets/images/team/team3.jpg";
import team4 from "../../../../public/assets/images/team/team4.jpg";
import team5 from "../../../../public/assets/images/team/team5.jpg";
import team6 from "../../../../public/assets/images/team/team6.jpg";
import Image from "next/image";

const teamMembers = [
    {
        name: "Johnson",
        role: "Web Developer",
        image: team1
    },
    {
        name: "John Doe",
        role: "Software Engineer",
        image: team2
    },
    {
        name: "Williams",
        role: "AI Specialist",
        image: team3
    },
    {
        name: "Michael Brown",
        role: "Chief Technology Officer",
        image: team4
    },
    {
        name: "David Wilson",
        role: "Lead Developer",
        image: team5
    },
    {
        name: "Daniel",
        role: "Product Manager",
        image: team6
    },
];

const Team = () => {
    return (
        <>
         <h2 className="text-3xl font-bold text-center mb-2  text-black space-y-5 pt-10" >
          Our <span className='text-gray-600'>Team</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-6 p-8">
            
            {teamMembers.map((member, index) => (
                <motion.div
                key={index}
                className="w-60 p-4 bg-white shadow-lg rounded-lg flex flex-col items-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                    <Image
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mb-4"
                        />
                    <h3 className="text-lg text-black font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                </motion.div>
            ))}
        </div>
            </>
    );
};

export default Team;
