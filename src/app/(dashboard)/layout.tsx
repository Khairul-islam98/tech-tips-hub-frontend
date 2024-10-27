import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  
  
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full">
      {/* Sidebar */}
      <div className="">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="mt-12 ml-8 lg:mt-20  flex-1">
        {children}
      </div>
    </div>
  );
}
