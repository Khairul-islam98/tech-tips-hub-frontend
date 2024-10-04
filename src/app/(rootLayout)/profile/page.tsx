"use client";
import ProfileCard from "@/app/(rootLayout)/profile/components/profile/profile-card";
import { useState } from "react";
import { ProfilePost } from "./components/posts/profile-post";
import { Followers } from "./components/followers/followers";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const tabs = [
    { name: "Posts", key: "posts" },
    { name: "Followers", key: "followers" },
    { name: "Following", key: "following" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile card */}
      <div className="mb-8">
        <ProfileCard />
      </div>

      {/* Tabs for profile sections */}
      <div className="flex flex-wrap space-x-2 sm:space-x-4 border-b-2 pb-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-lg px-4 py-2 ${
              activeTab === tab.key
                ? "border-b-2 border-blue-500 font-bold"
                : "text-gray-600"
            } whitespace-nowrap`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Conditional rendering of content based on active tab */}
      {/* {activeTab === 'profile' && <ProfileEditForm />} */}
      {activeTab === 'posts' && <ProfilePost />}
      {activeTab === 'followers' && <Followers />}
      {/* {activeTab === 'following' && <FollowingList userId={user?._id} />} */}
    </div>
  );
};

export default ProfilePage;
