/* eslint-disable react-hooks/exhaustive-deps */

import { Button } from "@/components/ui/button";
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUserRegistration } from "@/hooks/auth";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddAdminProps {
    refetch: () => Promise<any>; 
  }
export const AddAdmin = ({refetch}: AddAdminProps) => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const {mutate: createAdmin, isSuccess, data: registerResponse} = useUserRegistration()
  

    useEffect(()=> {
        if(registerResponse && !registerResponse.success){
           toast.error(registerResponse.message);
        }else if(registerResponse && registerResponse.success){
          if (isSuccess) {
            setOpen(false);
            refetch();
            reset();
          }
          toast.success("admin create successful");
        }
      }, [registerResponse, isSuccess]);
    


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const userData = {
          name: data.name,
          email: data.email,
          password: data.password,
          role: "admin"
        };
        createAdmin(userData)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="mb-2 mt-2 cursor-pointer  text-white  h-[50px]  font-bold text-2xl"
        >
          <span className=" relative z-10">Add Admin</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className=" hover:text-[#FEA633]] font-semibold">
            Add Car
          </DialogTitle>
          <DialogDescription>Make changes to your car here.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input {...register("name")} id="name" className="col-span-3" />
          
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
            type="email"
            {...register("email")}
            className=" col-span-3"
          />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Passoword
            </Label>
            <Input
            type="password"
            {...register("password")}
            className=" col-span-3"></Input>
          </div>
         
          
          <DialogFooter>
            <Button
              type="submit"
              className="w-full mt-2 cursor-pointer  text-white relative h-[50px]  font-bold text-2xl"
            >
              <span className=" relative z-10">Add Admin</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    );
};

