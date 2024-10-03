/* eslint-disable @next/next/no-img-element */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  
  interface ThumbnailProps {
    url: string | null | undefined;
  }
  
  export const Thumbnail = ({ url }: ThumbnailProps) => {
    if (!url) return null;
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="overflow-hidden bg-white w-full h-56 md:h-96 flex justify-center items-center border rounded-lg my-2 cursor-zoom-in">
            <img
              src={url}
              alt="Thumbnail image"
              className="object-cover rounded-md transition-transform duration-200 hover:scale-105"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="border-white p-0 m-0 flex justify-center items-center text-red-500">
          <img
            src={url}
            alt="Full size image"
            className="object-contain rounded-md"
          />
        </DialogContent>
      </Dialog>
    );
  };
  