"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Thumbnail } from "@/components/thumbnail";
import dynamic from "next/dynamic";
import { useGetSinglePost } from "@/hooks/post-hook";
import { useParams } from "next/navigation";
import { useState, useRef } from "react";
import { IComment } from "@/types";
import { useCreateComment, useGetComment } from "@/hooks/comment-hook";
import { useUser } from "@/context/user-provider";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Comment from "./comment";
import {
  useGetMyProfile,
  useUserFollow,
  useUserUnfollow,
} from "@/hooks/user-hook";
import Loader from "@/components/loader";
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
import DetailsVoteButton from "./details-vote-button";
import { CheckCircle } from "lucide-react";

const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });

const PostDetails = () => {
  const [newComment, setNewComment] = useState("");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const commentInputRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const { user } = useUser();
  const { data: post, isLoading } = useGetSinglePost(params.postId);
  const { data: userData, refetch: refetchOnSuccess } = useGetMyProfile(user?.email);
  const postId = Array.isArray(params.postId)
    ? params.postId[0]
    : params.postId;
  const { data: Comments, refetch } = useGetComment(postId);
  const { mutate: createComment } = useCreateComment();
  const [openSharePostId, setOpenSharePostId] = useState<string | null>(null);

  const authorUserId = post?.data?.authorId?._id;
  const userIdforFollow = userData?.data?._id;
  

  const isFollowing = userData?.data?.following?.some(
    (followingUserId: { _id: string }) => followingUserId._id === authorUserId
  );
  

  const followMutation = useUserFollow();
  const unfollowMutation = useUserUnfollow();



  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentData = {
        postId: params.postId,
        userId: user?._id,
        content: newComment,
      } as IComment;

      createComment(newCommentData, {
        onSuccess: () => {
          refetch();
          setNewComment("");
        },
        onError: (error) => {
          console.error("Error creating comment:", error);
        },
      });
    }
  };

  const handleCommentIconClick = () => {
    commentInputRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleShareOptions = (postId: string) => {
    if (openSharePostId === postId) {
      setOpenSharePostId(null);
    } else {
      setOpenSharePostId(postId);
    }
  };

  if (isLoading) return <Loader />;




  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 space-y-6">
        {/* Post Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="cursor-pointer rounded-full size-16 hover:opacity-75 transition">
              <AvatarImage
                src={post?.data?.authorId?.profilePhoto}
                alt="author"
              />
              <AvatarFallback className="bg-sky-500 text-white text-4xl rounded-md">
                {post?.data?.authorId?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-xl flex">
                {post?.data?.authorId?.name || "Unknown Author"}
                {post?.data?.authorId?.isVerified === true ?   <CheckCircle className="ml-1 text-green-500 text-center mt-1.5" size={16} /> : null}
              </p>
              <p className="text-gray-500 text-sm">
                {new Date(post?.data?.createdAt).toLocaleDateString()} |{" "}
                <span>
                  {formatDistanceToNow(new Date(post?.data?.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </p>
              <Badge className="bg-red-500">{post.data.category}</Badge>
            </div>
          </div>
          {user?._id !== post?.data?.authorId?._id && (
            <Button
            className="bg-blue-500 text-white rounded-full hover:bg-blue-600"
            onClick={async () => {
              try {
               
                if (isFollowing) {
                  console.log('Unfollowing user:', authorUserId);
                  unfollowMutation.mutate({
                    userId: userIdforFollow.toString(),
                    targetId: authorUserId.toString(),
                  }, {
                    onSuccess: () => {
                      refetchOnSuccess();
               
                    },
                  });
                } else {
                  console.log('Following user:', authorUserId);
                  followMutation.mutate({
                    userId: userIdforFollow.toString(),
                    targetId: authorUserId.toString(),
                  }, {
                    onSuccess: () => {
                      refetchOnSuccess();
                    },
                  });
                }
              } catch (error) {
                console.error("Error toggling follow status:", error);
              }
            }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
          
          
          )}
        </div>

        {/* Post Title */}
        <h1 className="text-4xl font-semibold mb-4">{post?.data?.title}</h1>

        {/* Post Images */}
        <div className="grid gap-4 mb-6">
          {post?.data?.images?.map((imageUrl: string, index: number) => (
            <Thumbnail key={index} url={imageUrl} />
          ))}
        </div>

        {/* Post Content */}
        <div className="text-lg mb-6">
          <Renderer value={post?.data?.content} />
        </div>

        {/* Footer - Upvotes/Downvotes, Comments, Share */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-4 text-gray-500">
            {/* Upvote/Downvote */}

             <DetailsVoteButton post={post?.data} />
            {/* Comments */}
            <div
              className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 cursor-pointer"
              onClick={handleCommentIconClick} 
            >
              <svg
                aria-hidden="true"
                fill="currentColor"
                height="20"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.725 19.872a.718.718 0 0 1-.607-.328.725.725 0 0 1-.118-.397V16H3.625A2.63 2.63 0 0 1 1 13.375v-9.75A2.629 2.629 0 0 1 3.625 1h12.75A2.63 2.63 0 0 1 19 3.625v9.75A2.63 2.63 0 0 1 16.375 16h-4.161l-4 3.681a.725.725 0 0 1-.489.191ZM3.625 2.25A1.377 1.377 0 0 0 2.25 3.625v9.75a1.377 1.377 0 0 0 1.375 1.375h4a.625.625 0 0 1 .625.625v2.575l3.3-3.035a.628.628 0 0 1 .424-.165h4.4a1.377 1.377 0 0 0 1.375-1.375v-9.75a1.377 1.377 0 0 0-1.374-1.375H3.625Z"></path>
              </svg>
              <span>
                {Array.isArray(Comments?.data) ? Comments?.data?.length : 0}
              </span>
            </div>

            {/* Share */}
            <div className="relative">
                    <Dialog
                      open={openSharePostId === post?._id}
                      onOpenChange={() => toggleShareOptions(post?._id)}
                    >
                      <DialogTrigger asChild>
                        <button
                          className="flex items-center space-x-2  bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                          onClick={() => toggleShareOptions(post?._id)}
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
                            {openSharePostId === post?._id
                              ? "Hide Share Options"
                              : "Share"}
                          </span>
                        </button>
                      </DialogTrigger>

                      <DialogContent>
                        <h3 className="text-xl font-bold mb-4">
                          Share this post:
                        </h3>

                        <div className="flex space-x-4 mx-auto">
                          {/* Social Share Buttons */}
                          <FacebookShareButton
                            url={`https://tech-tips-hub.vercel.app/post-details/${post?._id}`}
                          >
                            <FacebookIcon size={40} round />
                          </FacebookShareButton>

                          <TwitterShareButton
                            url={`https://tech-tips-hub.vercel.app/post-details/${post?._id}`}
                            title={post.title}
                          >
                            <TwitterIcon size={40} round />
                          </TwitterShareButton>

                          <LinkedinShareButton
                            url={`https://tech-tips-hub.vercel.app/post-details/${post?._id}`}
                            title={post.title}
                            summary={post.content}
                            source="YourWebsite"
                          >
                            <LinkedinIcon size={40} round />
                          </LinkedinShareButton>

                          <WhatsappShareButton
                            url={`https://tech-tips-hub.vercel.app/post-details/${post?._id}`}
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
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <Comment
            commentInputRef={commentInputRef}
            Comments={Comments}
            handleCommentSubmit={handleCommentSubmit}
            newComment={newComment}
            setNewComment={setNewComment}
            user={user ?? { _id: "", profilePhoto: "", name: "" }}
            formatDistanceToNow={formatDistanceToNow}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
