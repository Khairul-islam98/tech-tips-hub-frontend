"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGetAllPosts } from "@/hooks/post-hook";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Thumbnail } from "@/components/thumbnail";
import Loader from "@/components/loader";
import { useUser } from "@/context/user-provider";
import { useGetMyProfile, useUserFollow, useUserUnfollow } from "@/hooks/user-hook";


import { VoteButton } from "../components/vote-button";
import { CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { ShareDialog } from "../components/share-dialog";
import { PostFilter } from "./post-filter";


const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });

const PostCard = () => {
  const { user } = useUser();
  const [openSharePostId, setOpenSharePostId] = useState<string | null>(null);
  const [posts, setPosts] = useState([]);
 
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
 

  // Use the debounced value in the useGetAllPosts hook
  const { data, } = useGetAllPosts({
    searchTerm,
    category,
    sort,
  });
  const { data: userData, isLoading, refetch: refetchOnSuccess } = useGetMyProfile(user?.email);
  const router = useRouter();

  const followMutation = useUserFollow();
  const unfollowMutation = useUserUnfollow();



  const toggleShareOptions = (postId: string | null) => {
    setOpenSharePostId(postId);
  };

  if (isLoading) return <Loader />; 




  return (
    <div className="bg-gray-800 text-black max-w-3xl mx-auto rounded-lg shadow-lg p-4 space-y-8 group relative w-full bg-white/20 shadow-black/5 ring-[0.8px] ring-black/5">
      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 opacity-[0.15] blur-lg"></div>
      <div className="relative space-y-5 rounded-[0.62rem] shadow-sm shadow-black/5 ring-[0.8px] ring-black/5">
      <PostFilter
          searchTerm={searchTerm}
          category={category}
          sort={sort}
          setSearchTerm={setSearchTerm}
          setCategory={setCategory}
          setSort={setSort}
        />
        {data?.data?.map((post: any) => {
          const authorUserId = post.authorId?._id;
          const userIdforFollow = userData?.data?._id;
          const isFollowing = userData?.data?.following?.some(
            (followingUserId: { _id: string }) => followingUserId._id === authorUserId
          );

          const handleFollowToggle = async () => {
            if (!user) {
              router.push("/login");
              return;
            }
            try {
              if (isFollowing) {
                unfollowMutation.mutate(
                  { userId: userIdforFollow, targetId: authorUserId },
                  { onSuccess: () => refetchOnSuccess() }
                );
              } else {
                followMutation.mutate(
                  { userId: userIdforFollow, targetId: authorUserId },
                  { onSuccess: () => refetchOnSuccess() }
                );
              }
            } catch (error) {
              console.error("Error toggling follow status:", error);
            }
          };

          return (
            <div
              key={post._id}
              className="bg-white text-black p-6 rounded-lg shadow-md transition duration-200 hover:-translate-y-1 relative"
            >
              {post.isPremium && !userData?.data?.isVerified &&  (
                <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center z-10 rounded-lg backdrop-blur-sm">
                  <p className="text-white mb-4 text-center">This is premium content. Subscribe to access.</p>
                  <Link href="/premium" passHref>
                    <Button className="font-bold text-2xl h-[50px]">
                      Go Premium
                    </Button>
                  </Link>
                </div>
              )}

              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="cursor-pointer rounded-full size-10 hover:opacity-75 transition mx-auto">
                    <AvatarImage src={post.authorId?.profilePhoto} alt="author" />
                    <AvatarFallback className="bg-sky-500 text-white rounded-md">
                      {post.authorId?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold flex">
                      {post.authorId?.name || "Unknown Author"}
                      {post.authorId?.isVerified === true ? (
                        <CheckCircle className="ml-1 text-green-500 text-center mt-1.5" size={12} />
                      ) : null}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(post.createdAt).toLocaleDateString()} |{" "}
                      <span>
                        {formatDistanceToNow(new Date(post?.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </p>
                  </div>
                </div>
                {user?._id !== post?.authorId?._id && (
                  <Button
                    className="bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    onClick={handleFollowToggle}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                )}
              </div>

              {/* Post Title */}
              <Link href={`/post-details/${post._id}`} passHref>
                <p className="mb-4 text-xl font-semibold cursor-pointer">
                  {post.title}
                </p>
              </Link>

              {/* Post Content (Shortened) */}
              <Link href={`/post-details/${post._id}`} passHref>
                <div className="flex flex-col w-full">
                  <Renderer value={post.content} maxLength={300} />
                </div>
              </Link>

              {/* Post Images */}
              <div className="space-y-4 mb-4">
                {post.images?.length > 0 && (
                  <Thumbnail key="single-image" url={post.images[0]} />
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="">
                    <VoteButton post={post} />
                  </div>
                  <Link href={`/post-details/${post._id}`} passHref>
                    <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-full hover:bg-gray-600">
                      <svg
                        aria-hidden="true"
                        className="icon-comment"
                        fill="currentColor"
                        height="20"
                        icon-name="comment-outline"
                        viewBox="0 0 20 20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.725 19.872a.718.718 0 0 1-.607-.328.725.725 0 0 1-.118-.397V16H3.625A2.63 2.63 0 0 1 1 13.375v-9.75A2.629 2.629 0 0 1 3.625 1h12.75A2.63 2.63 0 0 1 19 3.625v9.75A2.63 2.63 0 0 1 16.375 16h-4.161l-4 3.681a.725.725 0 0 1-.489.191ZM3.625 2.25A1.377 1.377 0 0 0 2.25 3.625v9.75a1.377 1.377 0 0 0 1.375 1.375h4a.625.625 0 0 1 .625.625v2.575l3.3-3.035a.628.628 0 0 1 .424-.165h4.4a1.377 1.377 0 0 0 1.375-1.375v-9.75a1.377 1.377 0 0 0-1.374-1.375H3.625Z"></path>
                      </svg>
                      <span className="text-white text-sm font-normal">
                        {post.comments.length}
                      </span>
                    </div>
                  </Link>
                  {/* Share */}
                  <ShareDialog 
                    post={post} 
                    openSharePostId={openSharePostId} 
                    toggleShareOptions={toggleShareOptions}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostCard;
