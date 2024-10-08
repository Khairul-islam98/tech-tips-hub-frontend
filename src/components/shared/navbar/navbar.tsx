"use client";

import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Info,
  Phone,
  User,
  LogOut,
  NewspaperIcon,
  LayoutDashboardIcon,
  Plus,
  BadgeDollarSign,
  Bell,
} from "lucide-react";
import { Cross as Hamburger } from "hamburger-react";
import { useUser } from "@/context/user-provider";
import { logoutUser } from "@/services/auth-services";

import logo from "../../../../public/assets/images/logo.png";
import Image from "next/image";
import { protectedRoutes } from "@/utils/constant";
import PostModal from "@/components/post-modal";
import { useNotifications } from "@/context/notification-provider";
import { NotificationDialog } from "@/components/notification-dialog";

const Navbar = () => {
  const pathname = usePathname();
  const { user, setIsLoading } = useUser();
  const { notifications, clearNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const avatarFallback = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  const routes = [
    {
      path: "/",
      name: "News Feed",
      icon: <NewspaperIcon className="w-4 h-4 mr-2" />,
    },
    {
      path: "/about-us",
      name: "About Us",
      icon: <Info className="w-4 h-4 mr-2" />,
    },
    {
      path: "/contact-us",
      name: "Contact",
      icon: <Phone className="w-4 h-4 mr-2" />,
    },
  ];

  return (
    <div className="bg-[#481349] dark:text-white">
      <div className="max-w-screen-xl min-h-20 mx-auto flex items-center justify-between px-3">
        <Link href="/">
          <div className="flex justify-center items-center gap-2">
            <Image src={logo} alt="logo" className="w-10 h-10" />
            <p className="font-bold text-muted-foreground text-2xl pt-1">
              Tech <span className="text-sky-500">Hub</span>
            </p>
          </div>
        </Link>

        {/* Mobile device menus */}
        <div className="block md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button className="text-xl font-medium bg-transparent hover:bg-transparent p-0">
                <Hamburger
                  toggled={isOpen}
                  toggle={setIsOpen}
                  color="#0EA5E9"
                />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between items-center">
              <SheetHeader className="w-full">
                <SheetTitle className="text-xl mb-4">Menu</SheetTitle>
                <div className="flex flex-col space-y-2">
                  {routes.map((route) => (
                    <SheetClose asChild key={route.path}>
                      <Link href={route.path}>
                        <p
                          className={`flex items-center font-medium text-black hover:text-sky-500 uppercase p-2 border-b ${
                            pathname === route.path ? "text-sky-500" : ""
                          }`}
                        >
                          {route.icon}
                          {route.name}
                        </p>
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                {user?.email && (
                  <Button
                    onClick={() => setPostModalOpen(true)}
                    className="bg-transparent rounded-full hover:bg-black/40 text-black"
                  >
                    <Plus className="w-6 h-6 mr-1" /> Create Post
                  </Button>
                )}
              </SheetHeader>
              <SheetFooter className="w-full">
                {!user?.email ? (
                  <Link href="/login" className="w-full">
                    <Button className="w-full mt-2 cursor-pointer bg-sky-500 text-white font-bold text-2xl">
                      <span className="relative z-10">LOGIN →</span>
                    </Button>
                  </Link>
                ) : (
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
                        <User className="w-4 h-4 mr-2" />
                        <Link href={"/profile"}>Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {user.role === "admin" ? (
                          <div className="flex items-center">
                            <LayoutDashboardIcon className="w-4 h-4 mr-2" />
                            <Link href={`/${user.role}/admin-analytics`}>Dashboard</Link>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <LayoutDashboardIcon className="w-4 h-4 mr-2" />
                            <Link href={`/${user.role}/user-analytics`}>Dashboard</Link>
                          </div>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BadgeDollarSign className="w-4 h-4 mr-2" />
                        <Link href="/premium">Premium</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Navigation menu for large screens */}
        <div className="hidden md:flex w-full justify-center items-center gap-12">
          {routes.map((route) => (
            <Link key={route.path} href={route.path}>
              <p
                className={`flex items-center font-medium uppercase ${
                  pathname === route.path
                    ? "text-sky-500"
                    : "text-white hover:text-sky-500"
                }`}
              >
                {route.icon}
                {route.name}
              </p>
            </Link>
          ))}
        </div>

        {/* New Post button for large screens */}
        <div className="hidden md:flex items-center mr-2">
          {user?.email && (
            <Button
              onClick={() => setPostModalOpen(true)}
              className="bg-transparent rounded-full hover:bg-black/40 text-white"
            >
              <Plus className="w-6 h-6 mr-1" /> Create Post
            </Button>
          )}
        </div>

        {/* Notifications and Avatar section for large screens */}
        <div className="hidden md:flex items-center ml-auto gap-4">
          {/* Notifications Bell Icon */}
          <Button
            onClick={() => setShowNotifications(!showNotifications)}
            className="bg-transparent hover:bg-transparent relative"
          >
            <Bell className="text-white w-6 h-6" />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {notifications.length}
              </span>
            )}
          </Button>

          <NotificationDialog
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
            notifications={notifications}
            clearNotification={clearNotification}
          />

          {/* Login/Avatar section */}
          {!user?.email ? (
            <Link href="/login">
              <Button className="bg-sky-500 text-white font-bold text-2xl px-3">
                LOGIN
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none relative" asChild>
                <Avatar className="cursor-pointer rounded-md size-10 hover:opacity-75 transition mx-auto">
                  <AvatarImage src={user?.profilePhoto} alt="User Avatar" />
                  <AvatarFallback className="bg-sky-500 text-white rounded-md">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  <Link href={"/profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {user.role === "admin" ? (
                    <div className="flex items-center">
                      <LayoutDashboardIcon className="w-4 h-4 mr-2" />
                      <Link href={`/${user.role}/admin-analytics`}>Dashboard</Link>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <LayoutDashboardIcon className="w-4 h-4 mr-2" />
                      <Link href={`/${user.role}/user-analytics`}>Dashboard</Link>
                    </div>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BadgeDollarSign className="w-4 h-4 mr-2" />
                  <Link href="/premium">Premium</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Post Modal */}
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setPostModalOpen(false)}
      />
    </div>
  );
};

export default Navbar;
