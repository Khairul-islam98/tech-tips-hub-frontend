import React from 'react';

interface PostCardProps {
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  upvotes: number;
  downvotes: number;
  commentsCount: number;
  onUpvote: () => void;
  onDownvote: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  category,
  excerpt,
  author,
  date,
  image,
  upvotes,
  downvotes,
  commentsCount,
  onUpvote,
  onDownvote,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white flex flex-col space-y-3">
      {image && <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg" />}
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-blue-500">{category}</span>
        <div className="text-xs text-gray-500">{new Date(date).toLocaleDateString()}</div>
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-600">{excerpt}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>by {author}</span>
        <span>{commentsCount} comments</span>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center space-x-3">
          <button onClick={onUpvote} className="text-green-500 hover:text-green-600">
            ▲ {upvotes}
          </button>
          <button onClick={onDownvote} className="text-red-500 hover:text-red-600">
            ▼ {downvotes}
          </button>
        </div>
        <button className="text-blue-500 hover:underline">Read More</button>
      </div>
    </div>
  );
};

export default PostCard;
