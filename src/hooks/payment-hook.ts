import { premiumPayment } from "@/services/premium-payment-services";
import { PremiumPayment } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePremiumPayment = () => {
  return useMutation<any, Error, PremiumPayment>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (userData) => await premiumPayment(userData),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
