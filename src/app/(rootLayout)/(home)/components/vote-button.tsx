import { useUser } from "@/context/user-provider";
import { useCreateDownvote, useCreateUpvote } from "@/hooks/post-hook";
import { useGetMyProfile } from "@/hooks/user-hook";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface PostProps {
  _id: string;
  upvotes: string[];
  downvotes: string[];
}

export const VoteButton = ({ post }: { post: PostProps }) => {
  const { user } = useUser();
  const { data: userData } = useGetMyProfile(user?.email);
  const { mutate: upvoteMutation } = useCreateUpvote();
  const { mutate: downvoteMutation } = useCreateDownvote();
  const router = useRouter();

  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

  const [voteCount, setVoteCount] = useState({
    upvotes: post?.upvotes?.length || 0,
    downvotes: post?.downvotes?.length || 0,
  });

  useEffect(() => {
    if (userData?.data?._id) {
      setHasUpvoted(post?.upvotes?.includes(userData.data._id));
      setHasDownvoted(post?.downvotes?.includes(userData.data._id));
    }
  }, [post, userData?.data?._id]);


  useEffect(() => {
    setVoteCount({
      upvotes: post?.upvotes?.length || 0,
      downvotes: post?.downvotes?.length || 0,
    });
  }, [post]);

  const handleUpvote = () => {
    if (!user) {
      // Redirect to login if user is not logged in
      router.push("/login");
      return;
    }

    if (hasUpvoted) {
      // Cancel the upvote
      upvoteMutation(
        { postId: post._id, userId: userData.data._id, cancel: true },
        {
          onSuccess: () => {
            setVoteCount((prev) => ({
              ...prev,
              upvotes: prev.upvotes - 1,
            }));
            setHasUpvoted(false);
          },
          onError: (error) => {
            console.error("Cancel upvote error:", error.message);
          },
        }
      );
    } else {
      // Add an upvote
      upvoteMutation(
        { postId: post._id, userId: userData.data._id },
        {
          onSuccess: () => {
            setVoteCount((prev) => ({
              ...prev,
              upvotes: prev.upvotes + 1,
            }));
            setHasUpvoted(true);
            if (hasDownvoted) {
              // Remove downvote if exists
              setVoteCount((prev) => ({
                ...prev,
                downvotes: prev.downvotes - 1,
              }));
              setHasDownvoted(false);
            }
          },
          onError: (error) => {
            console.error("Upvote error:", error.message);
          },
        }
      );
    }
  };

  const handleDownvote = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (hasDownvoted) {
      // Cancel the downvote
      downvoteMutation(
        { postId: post._id, userId: userData.data._id, cancel: true },
        {
          onSuccess: () => {
            setVoteCount((prev) => ({
              ...prev,
              downvotes: prev.downvotes - 1,
            }));
            setHasDownvoted(false);
          },
          onError: (error) => {
            console.error("Cancel downvote error:", error.message);
          },
        }
      );
    } else {
      // Add a downvote
      downvoteMutation(
        { postId: post._id, userId: userData.data._id },
        {
          onSuccess: () => {
            setVoteCount((prev) => ({
              ...prev,
              downvotes: prev.downvotes + 1,
            }));
            setHasDownvoted(true);
            if (hasUpvoted) {
              // Remove upvote if exists
              setVoteCount((prev) => ({
                ...prev,
                upvotes: prev.upvotes - 1,
              }));
              setHasUpvoted(false);
            }
          },
          onError: (error) => {
            console.error("Downvote error:", error.message);
          },
        }
      );
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-full hover:bg-gray-600">
      <button
        onClick={handleUpvote}
        className={`hover:text-red-400 ${hasUpvoted ? "text-red-400" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2rem"
          height="1.2rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z"
          />
        </svg>
      </button>
      <span>{voteCount.upvotes}</span>
      <button
        onClick={handleDownvote}
        className={`hover:text-[#564FC4] ${hasDownvoted ? "text-[#564FC4]" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2rem"
          height="1.2rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M20.901 10.566A1 1 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059M12 19.399L6.081 12H10V4h4v8h3.919z"
          />
        </svg>
      </button>
      <span>{voteCount.downvotes}</span>
    </div>
  );
};
