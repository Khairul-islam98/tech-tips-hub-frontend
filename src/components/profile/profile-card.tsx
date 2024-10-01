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

const ProfileCard = () => {
  const { user, isLoading } = useUser();
  const [followerCount, setFollowerCount] = useState(10);
  const [followingCount, setFollowingCount] = useState(100);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setImagePreview(user.profilePhoto || ""); 
    }
  }, [user]);

  if (isLoading)
    return (
      <Loader className="size-4 mx-auto animate-spin text-muted-foreground" />
    );

  const avatarFallback = user?.name?.charAt(0).toUpperCase() || "U";

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

  const handleSave = () => {
    // Update profile logic goes here
    console.log("Profile updated:", { name, email, imagePreview });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:justify-between mb-6 w-full">
        {/* Avatar and user info */}
        <div className="flex flex-col sm:flex-row items-center mb-4 md:mb-0 w-full sm:w-auto">
          <Avatar className="w-28 h-28">
            <AvatarImage
              src={user?.profilePhoto || ""} 
              alt="User Avatar"
              className="rounded-full border-4 border-white cursor-pointer" 
             
            />
            <AvatarFallback className="bg-sky-500 text-white rounded-full">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="ml-0 sm:ml-4 text-center sm:text-left mt-4 sm:mt-0">
            <p className="text-2xl font-semibold">
              {user?.name || "User Name"}
            </p>
            <p className="text-gray-600">{user?.email || "user@example.com"}</p>
          </div>
        </div>

        {/* Follower and following counts */}
        <div className="flex gap-8 items-center justify-center md:justify-end w-full sm:w-auto">
          <div className="text-center">
            <p className="font-semibold">{followerCount}</p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{followingCount}</p>
            <p className="text-gray-500">Following</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-4">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <div className="mt-2 flex justify-center items-center mx-auto">
                  <Image
                    src={imagePreview || user?.profilePhoto || ""}
                    width={124}
                    height={124}
                    alt="Image Preview"
                    className="w-56 h-56 rounded-full border mt-2 cursor-pointer" 
                    onClick={() => document.getElementById("fileInput")?.click()} 
                  />
                </div>
                {/* Hidden file input for image upload */}
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
              {/* Add more form fields here if needed */}
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSave} className="mr-2">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ProfileCard;
