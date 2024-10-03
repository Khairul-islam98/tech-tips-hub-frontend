'use client';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from '../../../public/assets/images/logo.png';
import { useUser } from "@/context/user-provider";
import { usePremiumPayment } from "@/hooks/payment-hook";
import { toast } from "sonner";
import Loader from "../loader";

const PremiumBanner = () => {
  const { user, isLoading } = useUser(); 
  const { mutate: premiumPayment, isPending } = usePremiumPayment(); 

  console.log(user);

  const handlePayment = () => {
    if (!user) {
      toast.message("You need to login to subscribe to Premium.");
      return;
    }

    if(user.isVerified === true){
      toast.message("You are already a premium user.");
      return;
    }

    const premiumData = {
      userId: user._id,
      email: user.email,
      amount: 20,

    }

    premiumPayment(premiumData,
      
      {
        onSuccess: (data) => {
          window.location.href = data.paymentUrl;
        },
        onError: (error) => {
          toast.error("Payment failed. Please try again.");
        },
      }
    );
  };

  if(isLoading) return <Loader />

  return (
    <div className="relative bg-gradient-to-r from-green-400 via-green-300 to-green-500 flex items-center justify-center py-16 px-6 md:px-12 lg:px-24 flex-wrap">
    
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-green-300 opacity-60 clip-path-diagonal"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.div
          className="lg:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-6 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Tech Tips Hub <span className="text-[#FEA633]">Premium</span>
          </motion.h1>
          <motion.p
            className="text-base lg:text-lg text-gray-700 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Get access to exclusive content, premium features, and more. Subscribe now.
          </motion.p>

          {/* Payment Button */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button
              onClick={handlePayment}
              disabled={isPending}
              className="bg-white rounded-full px-20 py-5 border text-black hover:bg-transparent shadow-lg transition-all"
            >
              {isPending ? "Processing..." : "$20/month"}
            </Button>
          </motion.div>

          
        </motion.div>

 
        <motion.div
          className="w-full lg:w-1/2 mt-8 lg:mt-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Image
            src={logo}
            alt="Premium logo"
            className="w-full h-96 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumBanner;
