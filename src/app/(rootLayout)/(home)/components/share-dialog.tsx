import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
  } from "react-share";

  import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ShareDialogProps {
  post: {
    _id: string;
    title: string;
    content: string;
  };
  openSharePostId: string | null;
  toggleShareOptions: (id: string) => void;
}

export const ShareDialog = ({ post, openSharePostId, toggleShareOptions }: ShareDialogProps) => {
    return (
        <div className="relative">
        <Dialog
          open={openSharePostId === post._id}
          onOpenChange={() => toggleShareOptions(post._id)}
        >
          <DialogTrigger asChild>
            <button
              className="flex items-center space-x-2 text-white/70 bg-gray-700 p-2 rounded-full hover:bg-gray-600"
              onClick={() => toggleShareOptions(post._id)}
            >
              <svg
                aria-hidden="true"
                className="icon-share"
                fill="currentColor"
                height="20"
                icon-name="share-new-outline"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m18.8 8.286-6.466-7.064a.759.759 0 0 0-1.295.537v3.277C5.623 5.365 1 9.918 1 15.082v2.907h1.274C2.516 15 5.81 12.62 9.834 12.62h1.205v3.226a.757.757 0 0 0 1.315.515l6.422-7.021A.756.756 0 0 0 19 8.8a.736.736 0 0 0-.2-.514Zm-6.508 6.3V12a.625.625 0 0 0-.625-.625H9.834A9.436 9.436 0 0 0 2.26 14.7c.228-4.536 4.525-8.435 9.4-8.435a.626.626 0 0 0 .625-.625V3.023L17.576 8.8l-5.284 5.786Zm5.586-6.107a.176.176 0 0 0-.023.024.171.171 0 0 1 .02-.028l.003.004Zm-.011.642a.53.53 0 0 0-.003-.004l.003.004Z"></path>
              </svg>
              <span>
                {openSharePostId === post._id
                  ? "Hide Share Options"
                  : "Share"}
              </span>
            </button>
          </DialogTrigger>
            {/* @ts-ignore */}
          <DialogContent className="">
            <h3 className="text-xl font-bold mb-4">
              Share this post:
            </h3>

            <div className="flex space-x-4 mx-auto">
              {/* Social Share Buttons */}
              <FacebookShareButton
                url={`https://tech-tips-hub.vercel.app/post-details/${post._id}`}
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>

              <TwitterShareButton
                url={`https://tech-tips-hub.vercel.app/post-details/${post._id}`}
                title={post.title}
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>

              <LinkedinShareButton
                url={`https://tech-tips-hub.vercel.app/post-details/${post._id}`}
                title={post.title}
                summary={post.content}
                source="YourWebsite"
              >
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>

              <WhatsappShareButton
                url={`https://tech-tips-hub.vercel.app/post-details/${post._id}`}
                title={post.title}
                separator=":: "
              >
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
            </div>

            {/* Dialog Close Button */}
            <DialogClose asChild>
              <Button className="btn-close mt-4">Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    );
};
