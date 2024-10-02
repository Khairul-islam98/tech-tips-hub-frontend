export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  profilePhoto: string;
  isVerified?: boolean;
  followers?: string[];
  following?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IPost {
  _id?: string;
  title: string;
  content: string;
  authorId: string;
  comments?: string[];
  images: string[];
  category: string;
  isPremium?: boolean;
  upvotes?: number;
  downvotes?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PremiumPayment {
  userId: string;
  email: string;
  amount: number;
}
