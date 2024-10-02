"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useGetAllPosts } from "@/hooks/post"; // Custom hook to fetch posts
import { Thumbnail } from "../thumbnail"; // Thumbnail component for displaying images
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import Link from "next/link";
const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });

const PostCard = () => {
  const { data, isLoading, isError, refetch } = useGetAllPosts(); // Fetch posts

  useEffect(() => {
    refetch(); // Refetch posts on component mount
  }, [refetch]);

  if (isLoading) return <div>Loading...</div>; // Loading state
  if (isError) return <div>Error loading posts.</div>; // Error state

  return (
    <div className="bg-gray-800 text-white max-w-3xl mx-auto rounded-lg shadow-lg p-4 space-y-8 group relative w-full  bg-white/20  shadow-black/5 ring-[0.8px] ring-black/5">
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 opacity-[0.15] blur-lg"></div>
        <div className="relative space-y-5 rounded-[0.62rem] shadow-sm shadow-black/5 ring-[0.8px] ring-black/5 ">
      {data?.data.map((post) => (
        <div
          key={post._id}
          className="bg-white text-black p-6 rounded-lg shadow-md transition duration-200 hover:-translate-y-1"
        >
          {/* Header */}
         
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
            <Avatar className="cursor-pointer rounded-full size-10 hover:opacity-75 transition mx-auto">
                  <AvatarImage src={post.authorId?.profilePhoto } alt="author" />
                  <AvatarFallback className="bg-sky-500 text-white rounded-md">
                    {post.authorId?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              <div>
                <p className="font-bold">
                  {post.authorId?.name || "Unknown Author"}
                </p>
                <p className="text-gray-400 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600">
              Follow
            </Button>
          </div>
          <Link href={`/posts/${post._id}`}>

          {/* Post Title */}
          <p className="mb-4 text-xl font-semibold">{post.title}</p>

          {/* Post Content (Shortened) */}
          <div className="flex flex-col w-full">
            <Renderer value={post.content} maxLength={300} />
          </div>
          </Link>
     
          {/* Post Images */}
          <div className="space-y-4 mb-4">
            {post.images?.map((imageUrl, index) => (
              <Thumbnail key={index} url={imageUrl} />
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-4 text-gray-400">
              {/* Upvote/Downvote */}
              <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-full hover:bg-gray-600">
                <button className="hover:text-red-400">
                    
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><path fill="currentColor" d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z"/></svg>
                </button>
                <span>{post.upvotes}</span>
                <button className="hover:text-[#564FC4]">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><path fill="currentColor" d="M20.901 10.566A1 1 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059M12 19.399L6.081 12H10V4h4v8h3.919z"/></svg>
                </button>
              </div>

              {/* Comments */}
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
                <span>
                  {Array.isArray(post.comments) ? post.comments.length : 0}
                </span>
              </div>

              {/* Share */}
              <button className="flex items-center space-x-2 bg-gray-700 p-2 rounded-full hover:bg-gray-600">
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
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default PostCard;
