import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 xl:w-1/5">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="mt-12 ml-8 lg:mt-20 flex-1 px-4 sm:px-6 lg:px-8 container">
        {children}
      </div>
    </div>
  );
}
