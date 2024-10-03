import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MdSend, MdDelete, MdEdit, MdClose } from "react-icons/md"; // Added MdClose icon
import { RefObject, useState } from "react";
import { useDeleteComment, useEditComment } from "@/hooks/comment";
import { Button } from "@/components/ui/button";

interface CommentProps {
  commentInputRef: RefObject<HTMLDivElement>;
  Comments: { data: Array<{ _id: string; userId: { _id: string; profilePhoto: string; name: string }; createdAt: string; content: string; updatedAt?: string; }> };
  newComment: string;
  setNewComment: (value: string) => void;
  handleCommentSubmit: () => void;
  user: { _id: string; profilePhoto: string; name: string };
  formatDistanceToNow: (date: Date, options?: { addSuffix?: boolean }) => string;
  refetch: () => void;
}

const Comment = ({
  commentInputRef,
  Comments,
  newComment,
  setNewComment,
  handleCommentSubmit,
  user,
  formatDistanceToNow,
  refetch,
}: CommentProps) => {
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: editComment } = useEditComment();
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  const handleEditClick = (commentId: string, content: string) => {
    setEditCommentId(commentId);
    setEditContent(content);
  };

  const handleEditSubmit = (commentId: string) => {
    if (editContent.trim()) {
      editComment(
        {
          commentId,
          content: editContent,
        },
        {
          onSuccess: () => { 
            refetch(); 
            setEditCommentId(null); 
          },
          onError: (error) => {
            console.error("Error editing comment:", error);
          },
        }
      );
    } else {
      console.log('Comment cannot be empty');
    }
  };

  const handleCancelEdit = () => {
    setEditCommentId(null); // Close the edit form when canceled
  };

  const handleDeleteComment = (id: string) => {
    deleteComment(id, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error("Error deleting comment:", error);
      },
    });
  };

  return (
    <div ref={commentInputRef} className="mt-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      {/* Render comment section */}
      <div className="space-y-6">
        {Comments.data.map((comment) => (
          <div key={comment._id} className="flex space-x-4 bg-white p-4 rounded-lg shadow-md">
            <Avatar className="w-12 h-12">
              <AvatarImage src={comment.userId?.profilePhoto} alt="comment-author" />
              <AvatarFallback className="bg-sky-500 text-white">
                {comment.userId?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-lg">{comment.userId?.name}</p>
                  <p className="text-sm text-gray-400">
                    {formatDistanceToNow(new Date(comment.updatedAt || comment.createdAt), { addSuffix: true })}
                  </p>
                </div>

                {user?._id === comment.userId?._id && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEditClick(comment._id, comment.content)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                )}
              </div>

              {editCommentId === comment._id ? (
                <div className="mt-2">
                  <Input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="mb-2 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button onClick={() => handleEditSubmit(comment._id)} className="bg-blue-500 text-white px-3 py-1 rounded">
                      <MdSend size={18} className="mr-1" /> Save
                    </Button>
                    <Button onClick={handleCancelEdit} className="bg-gray-500 text-white px-3 py-1 rounded">
                      <MdClose size={18} className="mr-1" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-800">{comment.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New comment input */}
      <div className="mt-6 flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user?.profilePhoto} alt="user-avatar" />
          <AvatarFallback className="bg-sky-500 text-white">
            {user?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <Button onClick={handleCommentSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
          <MdSend size={22} />
        </Button>
      </div>
    </div>
  );
};

export default Comment;
