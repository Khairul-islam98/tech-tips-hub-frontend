import { useState, useEffect } from "react";
import { useUser } from "@/context/user-provider";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "lucide-react"; 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useGetMyProfile, useUpdateProfile } from "@/hooks/user-hook";
import envConfig from "@/config/env-config";
import { toast } from "sonner";
import { motion } from "framer-motion"; 
import { CheckCircle, Facebook } from "lucide-react"; // Import necessary icons

const ProfileCard = () => {
  const { user, isLoading } = useUser();
  const { data: userData, refetch } = useGetMyProfile(user?.email);
  const { mutate: updateProfile } = useUpdateProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  useEffect(() => {
    if (userData) {
      setName(userData?.data?.name || "");
      setEmail(userData?.data?.email || "");
      setImagePreview(userData?.data?.profilePhoto || "");
    }
  }, [userData]);

  if (isLoading)
    return (
      <Loader className="size-4 mx-auto animate-spin text-muted-foreground" />
    );

  const avatarFallback = userData?.data?.name?.charAt(0).toUpperCase() || "U";

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      let imageUrl = imagePreview;

      if (imagePreview && imagePreview !== userData?.data?.profilePhoto) {
        const formData = new FormData();
        const fileInput = document.getElementById("fileInput") as HTMLInputElement;
        const file = fileInput?.files?.[0];
        if (file) {
          formData.append("file", file);
          if (envConfig.uploadPreset) {
            formData.append("upload_preset", envConfig.uploadPreset);
          } else {
            throw new Error("Upload preset is not defined");
          }
          if (envConfig.cloudName) {
            formData.append("cloud_name", envConfig.cloudName);
          } else {
            throw new Error("Cloud name is not defined");
          }

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${envConfig.cloudName}/image/upload`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          imageUrl = response.data.secure_url;
        }
      }

      const updateData = {
        name,
        email,
        profilePhoto: imageUrl,
      };

      if (userData) {
        const email = userData?.data?.email;
        if (email) {
          updateProfile(
            { email, userData: updateData },
            {
              onSuccess: () => {
                refetch();
                setIsDialogOpen(false); 
              },
            }
          );
        } else {
          console.error("Email is undefined");
        }
      } else {
        console.error("userData is undefined");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:justify-between mb-6 w-full">
        <div className="flex flex-col sm:flex-row items-center mb-4 md:mb-0 w-full sm:w-auto">
          <motion.div
            whileHover={{ scale: 1.1 }} // Scale up on hover
            transition={{ duration: 0.3 }}
            className="w-28 h-28"
          >
            <Avatar className="w-full h-full">
              <AvatarImage
                src={userData?.data?.profilePhoto || ""}
                alt="User Avatar"
                className="rounded-full border-4 border-white cursor-pointer"
              />
              <AvatarFallback className="bg-sky-500 text-white rounded-full">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="ml-0 sm:ml-4 text-center sm:text-left mt-4 sm:mt-0">
            <motion.p
              initial={{ opacity: 0 }} // Fade in effect
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold flex items-center"
            >
              {userData?.data?.name || "User Name"}
              {userData?.data?.isVerified === true ? <CheckCircle className="ml-2 text-green-500" size={20} /> : null}
              
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }} // Fade in effect
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600"
            >
              {userData?.data?.email || "user@example.com"}
            </motion.p>
           
          </div>
        </div>

        <div className="flex gap-8 items-center justify-center md:justify-end w-full sm:w-auto">
          <div className="text-center">
            <p className="font-semibold">{userData?.data?.followers?.length}</p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{userData?.data?.following?.length}</p>
            <p className="text-gray-500">Following</p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ml-4">Edit Profile</Button>
          </DialogTrigger>
            {/* @ts-ignore */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <div className="mt-2 flex justify-center items-center mx-auto">
                  <Image
                    src={imagePreview || userData?.data?.profilePhoto || ""}
                    width={124}
                    height={124}
                    alt="Image Preview"
                    className="w-56 h-56 rounded-full border mt-2 cursor-pointer"
                    onClick={() => document.getElementById("fileInput")?.click()}
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="fileInput"
                  className="hidden"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSave} className="mr-2">
                Update Profile
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ProfileCard;
