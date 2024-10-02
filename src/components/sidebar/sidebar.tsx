'use client';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/user-provider";
import { useState } from "react";
import { Cross as Hamburger } from "hamburger-react";
import { logoutUser } from "@/services/auth-services";

import { Home, LogOut } from "lucide-react";
import Loader from "../loader";

const Sidebar = () => {
  const { user, setIsLoading, isLoading } = useUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const adminRoutes = [
    {
      name: "Admin",
      path: "/admin/admin",
    },
    {
      name: "Manage Cars",
      path: "/admin/manage-cars",
    },
    {
      name: "Manage Bookings",
      path: "manage-bookings",
    },
    {
      name: "Manage Return Cars",
      path: "manage-return-cars",
    },
    {
      name: "User Management",
      path: "manage-users",
    },
  ];

  const userRoutes = [
    {
      name: "User",
      path: "/user/user",
    },
    {
      name: "Booking Management",
      path: "/user/booking-management",
    },
    {
      name: "Payment Management",
      path: "/user/payment-management",
    },
  ];

  const handleLogout = () => {
    logoutUser();
    setIsLoading(true);
    router.push("/");
   
  };

  const avatarFallback = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  if (isLoading)
    return (
      <Loader />
    );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-[300px] px-4 py-8 border-r h-[100vh] hidden lg:block fixed top-0 left-0  bg-white shadow-lg dark:bg-gray-900">
        {/* Logo */}
        <div className="max-w-[160px] pb-4 text-center mx-auto border-b">
          <h1 className="mb-4 text-gray-600 dark:text-white">
            Welcome Car <span className="text-[#FEA633]">Rental</span> 😍
          </h1>
          <DropdownMenu>
                    <DropdownMenuTrigger
                      className="outline-none relative"
                      asChild
                    >
                      <Avatar className="cursor-pointer rounded-md size-10 hover:opacity-75 transition mx-auto">
                        <AvatarImage
                          src={user?.profilePhoto}
                          alt="User Avatar"
                        />
                        <AvatarFallback className="bg-sky-500 text-white rounded-md">
                          {avatarFallback}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Home className="w-4 h-4 mr-2" />
                        <Link href={"/"}>Home</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
        </div>

        {/* Routes */}
        <div className="flex flex-col gap-4 py-8">
          {user?.role === "admin"
            ? adminRoutes.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-gray-600 hover:text-[#FEA633] p-2 flex gap-3 items-center text-lg rounded-xl dark:text-white ${
                    pathname === item.path
                      ? "text-[#FEA633] border-l-4 border-[#FEA633] border-b"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))
            : userRoutes.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-gray-600 hover:text-[#FEA633] p-2 flex gap-3 items-center text-lg rounded-xl dark:text-white ${
                    pathname === item.path
                      ? "text-[#FEA633] border-l-4 border-[#FEA633] border-b"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
        </div>

        
      </div>

      {/* Mobile Sidebar (Sheet) */}
      <div className="flex items-center justify-between h-20 bg-gray-50 px-3 lg:hidden shadow-sm">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
          <Button className="text-xl font-medium bg-transparent hover:bg-transparent p-0">
                <Hamburger
                  toggled={isOpen}
                  toggle={setIsOpen}
                  color="#FEA633"
                />
              </Button>
          </SheetTrigger>

          <SheetContent className="">
            <SheetHeader>
              <SheetTitle className="mb-4 text-gray-600 text-center">
                Welcome Car <span className="text-[#FEA633]">Rental</span> 😍
              </SheetTitle>

              <SheetTitle className="font-bold uppercase text-gray-600 text-center">
              <DropdownMenu>
                    <DropdownMenuTrigger
                      className="outline-none relative mb-4"
                      asChild
                    >
                      <Avatar className="cursor-pointer rounded-md size-10 hover:opacity-75 transition mx-auto">
                        <AvatarImage
                          src={user?.profilePhoto}
                          alt="User Avatar"
                        />
                        <AvatarFallback className="bg-sky-500 text-white rounded-md">
                          {avatarFallback}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Home className="w-4 h-4 mr-2" />
                        <Link href={"/"}>Home</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-4 py-8 border-t">
              {user?.role === "admin"
                ? adminRoutes.map((item) => (
                    <SheetClose asChild key={item.path}>
                      <Link
                        href={item.path}
                        className={`text-gray-600 hover:text-[#FEA633] p-2 flex gap-3 items-center text-lg rounded-xl ${
                          pathname === item.path
                            ? "text-[#FEA633] border-l-4 border-[#FEA633]"
                            : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))
                : userRoutes.map((item) => (
                    <SheetClose asChild key={item.path}>
                      <Link
                        href={item.path}
                        className={`text-gray-600 hover:text-[#FEA633] p-2 flex gap-3 items-center text-lg rounded-xl ${
                          pathname === item.path
                            ? "text-[#FEA633] border-l-4 border-[#FEA633] border-b"
                            : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;