/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useDebounce from "@/hooks/debounce-hook";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SortDescIcon } from "lucide-react";

interface PostFilterProps {
  searchTerm: string;
  category: string;
  sort: string;
  setSearchTerm: (value: string) => void;
  setCategory: (value: string) => void;
  setSort: (value: string) => void;
}

export const PostFilter = ({
  searchTerm,
  category,
  sort,
  setSearchTerm,
  setCategory,
  setSort,
}: PostFilterProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Defining categories for filter
  const categories = [
    { value: "", label: "All Categories", icon: "🌐" },
    {
      value: "software engineering",
      label: "Software Engineering",
      icon: "💻",
    },
    { value: "web", label: "Web", icon: "🌍" },
    { value: "AI", label: "AI", icon: "⚙️" },
    { value: "devops", label: "DevOps", icon: "🔒" },
    { value: "machine-learning", label: "Machine Learning", icon: "🤖" },
  ];

  const debouncedSearchTerm = useDebounce(localSearchTerm, 500);

  const sorts = [
    { value: "createdAt", label: "Date" },
    { value: "upvote", label: "Upvotes" },
    { value: "downvote", label: "Downvotes" },
  ];

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleSearchSubmit = () => {
    setSearchTerm(localSearchTerm);
  };

  const handleClearFilters = () => {
    setLocalSearchTerm("");
    setCategory("");
    setSort("");
  };

  return (
    <motion.div
      className="mb-4 space-y-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Search Input */}
      <div className="flex space-x-2">
        <motion.input
          type="text"
          placeholder="Search posts... e.g."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
          whileFocus={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
        <Button onClick={handleSearchSubmit} className="bg-blue-500 h-10 text-white">
          Search
        </Button>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        {/* Category Badges */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`flex items-center border rounded px-3 py-1 text-sm ${
                category === cat.value
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } transition-colors duration-200`}
            >
              <span className="mr-1">{cat.icon}</span>{" "}
              {/* Icon next to label */}
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                className="p-2 border rounded w-full md:w-1/3 text-left ml-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sort ? sorts.find((s) => s.value === sort)?.label : <SortDescIcon />}
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sorts.map((sortOption) => (
                <DropdownMenuItem
                  key={sortOption.value}
                  onClick={() => setSort(sortOption.value)}
                >
                  {sortOption.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={handleClearFilters}
            className="bg-red-500 text-white"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="flex justify-end"></div>
    </motion.div>
  );
};
