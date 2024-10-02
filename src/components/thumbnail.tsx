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
          <div className="overflow-hidden w-full h-56 sm:h-48 flex justify-center items-center border rounded-lg my-2 cursor-zoom-in">
            <img
              src={url}
              alt="Thumbnail image"
              className="object-cover rounded-md transition-transform duration-200 hover:scale-105"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="bg-white p-0 m-0 flex justify-center items-center">
          <img
            src={url}
            alt="Full size image"
            className="object-contain rounded-md"
          />
        </DialogContent>
      </Dialog>
    );
  };
  