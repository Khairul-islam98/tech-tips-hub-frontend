import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useUpdatePost } from "@/hooks/post-hook";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Quill from "quill";
import { useRef, useState, useEffect } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import envConfig from "@/config/env-config";
import dynamic from "next/dynamic";

const PostEditor = dynamic(() => import("@/components/post-editor"), { ssr: false });



interface FormData {
  id: string;
  title: string;
  body: string;
  images: File[] | null;
  category: string;
  isPremium: boolean;
}

interface UpdatePostProps {
  postData: any; 
}

export const UpdatePost = ({ postData }: UpdatePostProps) => {
  const { mutate: updatePost } = useUpdatePost();
  const {  reset } = useForm<FormData>();
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const quillRef = useRef<Quill | null>(null);
  
  const [text, setText] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (postData) {
      setTitle(postData.title);
      setCategory(postData.category);
      setIsPremium(postData.isPremium);
      reset({
        title: postData.title,
        body: postData.content,
        category: postData.category,
        isPremium: postData.isPremium,
      });

      if (postData.images) {
        setImages(postData.images.map((url: string) => new File([url], url)));
      }
    }
  }, [postData, reset]);

  const onSubmit = async ({
    id,
    title,
    body,
    category,
    isPremium,
    images
  }: {
    id: string;
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
  
      // Prepare the post data
      const updatedPost = {
        id: postData._id, 
        userData: {
          title,
          category,
          isPremium,
          content: body,
          images: imageUrls, 
        },
      };

      
      updatePost(updatedPost, {
        onSuccess: () => {
          toast.success("Post updated successfully");
          setIsOpen(false); 
          reset();
        },
      });

  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}> 
          <Edit size={16} />
        </Button>
      </DialogTrigger>
        {/* @ts-ignore */}
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Post</DialogTitle>
        </DialogHeader>
        <PostEditor
          onSubmit={({ images, body, title, category, isPremium }) => {
            onSubmit({ id: postData._id, title, body, category, isPremium, images: images || []});
          }}
          innerRef={quillRef}
          variant="update"
          defaultValue={postData.content ? JSON.parse(postData.content) : []}
          defaultTitle={postData.title || ""}
          defaultCategory={postData.category || ""}
          defaultIsPremium={postData.isPremium || false}
          defaultImages={postData.images ? postData.images : []} 
        />
      </DialogContent>
    </Dialog>
  );
};
