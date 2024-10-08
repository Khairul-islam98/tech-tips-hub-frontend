"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUser } from "@/context/user-provider";
import axios from "axios";
import envConfig from "@/config/env-config";
import Quill from "quill";
import { useCreatePost, useGetAllPosts } from "@/hooks/post-hook";
import { useRouter } from "next/navigation";



const PostEditor = dynamic(() => import("@/components/post-editor"), { ssr: false });

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostModal = ({ isOpen, onClose }: PostModalProps) => {
  const [uploading, setUploading] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const editorRef = useRef<Quill | null>(null);
  const { user } = useUser(); 
  const {mutate: createPost, reset} = useCreatePost()
  const {refetch} = useGetAllPosts({searchTerm: "", category: "", sort: ""});



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
          console.log("Post created successfully");
          setEditorKey((prevKey) => prevKey + 1);
          refetch()
          onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
        {/* @ts-ignore */}
      <DialogContent className="w-full mx-auto justify-center max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
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

export default PostModal;
