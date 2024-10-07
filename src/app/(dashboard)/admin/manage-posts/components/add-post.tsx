/* eslint-disable react-hooks/exhaustive-deps */

import { Button } from "@/components/ui/button";
import { Dialog,
    DialogContent,
   
    DialogHeader,
    DialogTitle,
    DialogTrigger, } from "@/components/ui/dialog";
import envConfig from "@/config/env-config";

import { useUser } from "@/context/user-provider";

import { useCreatePost } from "@/hooks/post-hook";
import axios from "axios";
import { Edit } from "lucide-react";
import dynamic from "next/dynamic";
import Quill from "quill";

import {  useRef, useState } from "react";
const PostEditor = dynamic(() => import("@/components/post-editor"), { ssr: false });

interface AddAdminProps {
    refetch: () => Promise<any>; 
  }
export const AddPost = ({refetch}: AddAdminProps) => {
  const [uploading, setUploading] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const editorRef = useRef<Quill | null>(null);
  const { user } = useUser(); 
    const [isOpen, setIsOpen] = useState(false);
    const {mutate: createPost, reset} = useCreatePost()
  
    const handleSubmit = async ({
      title,
      body,
      category,
      isPremium,
      images
    }: {
      title: string;
      body: string;
      images: File[] | null;
      category: string;
      isPremium: boolean;
    }) => {
      
      
      let imageUrls: string[] = []; 
    
      if (images && images.length > 0) {
        setUploading(true);
    
     
        for (const image of images) {
          const formData = new FormData();
          formData.append("file", image);
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
    
          try {
            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/${envConfig.cloudName}/image/upload`,
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                  const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                  console.log(`Upload progress: ${percentCompleted}%`);
                },
              }
            );
    
         
            imageUrls.push(response.data.secure_url);
          } catch (error) {
            console.error("Image upload failed:", error);
          }
        }
    
        setUploading(false);
      }
    
      console.log("imageUrls", imageUrls);
    
      const postData = {
        title,
        content: body,
        category,
        isPremium,
        authorId: user?._id || "",
        images: imageUrls,
      };
    
    
      try {
        createPost(postData, {
          onSuccess: () => {
          
            setEditorKey((prevKey) => prevKey + 1);
            setIsOpen(false);
            refetch()
        
          },
          onError: () => {
            console.error("Failed to create post");
          }
        });
      } catch (error) {
        console.error("Error submitting post:", error);
      }
    };
    
    


  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}> 
          Add Post
          <Edit size={16} />
        </Button>
      </DialogTrigger>
        {/* @ts-ignore */}
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Post</DialogTitle>
        </DialogHeader>
        <PostEditor
          key={editorKey}
          onSubmit={handleSubmit}
          innerRef={editorRef}
        />
      </DialogContent>
    </Dialog>
    );
};

