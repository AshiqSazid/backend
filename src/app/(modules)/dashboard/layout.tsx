
"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/context/AuthContext";
import {
    BarChart3,
    List,
    LogOut,
    Menu,
    Settings,
    Settings2,
    User,
    X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { ToastContainer } from "react-toastify";

import useResponsive from "@/hooks/useResponsive";
import { useSession } from "next-auth/react";


export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const { handleRemoveLoginInfo, userInfo } = useAuthContext();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isMobile } = useResponsive();
    const handleLogout = () => {
        secureLocalStorage.removeItem('@authToken');
        window.location.href = '/login';
        handleRemoveLoginInfo();
    };



    return (
        <>
            <ToastContainer />
            <div className="flex h-screen bg-background">
                {/* Mobile Sidebar Toggle */}
                <div className="md:hidden fixed top-4 left-4 z-50">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </Button>
                </div>

                {/* Sidebar */}
                <div
                    className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:relative z-40 w-64 bg-[#001219] md:m-2 rounded transition-transform duration-300 ease-in-out
          h-screen md:h-auto`}
                >
                    <div className="p-6 gap-y-2 items-center justify-center">
                        <Image
                            className="bg-transparent resize-contain"
                            width={160}
                            height={80}
                            src={"/assets/logo.jpg"}
                            alt="Logo"
                        />
                        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
                    </div>
                    <nav className="mt-6">
                        <div className="px-4 space-y-2">
                            <Link href="/dashboard" onClick={() => isMobile && setSidebarOpen(false)}>
                                <Button
                                    variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                                    className="w-full justify-start text-white   hover:text-white"
                                >
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    Dashboard
                                </Button>
                            </Link>

                            <Link href="/dashboard/upload-song" onClick={() => isMobile && setSidebarOpen(false)}>
                                <Button
                                    variant={pathname === "/dashboard/upload-song" ? "secondary" : "ghost"}
                                    className="w-full justify-start text-white hover:text-white"
                                >
                                    <Settings className="mr-2 h-4 w-4" />
                                    Upload Song
                                </Button>
                            </Link>
                            <Link href="/dashboard/song-list" onClick={() => isMobile && setSidebarOpen(false)}>
                                <Button
                                    variant={pathname === "/dashboard/song-list" ? "secondary" : "ghost"}
                                    className="w-full justify-start text-white hover:text-white"
                                >
                                    <List className="mr-2 h-4 w-4" />
                                    Uploaded Song List
                                </Button>
                            </Link>
                            <Link href="/dashboard/feature-settings" onClick={() => isMobile && setSidebarOpen(false)}>
                                <Button
                                    variant={pathname === "/dashboard/feature-settings" ? "secondary" : "ghost"}
                                    className="w-full justify-start text-white hover:text-white"
                                >
                                    <Settings2 className="mr-2 h-4 w-4" />
                                    Feature Settings
                                </Button>
                            </Link>
                        </div>
                        <div className="absolute bottom-4 px-4 w-[calc(100%-2rem)]">
                            <Button
                                onClick={handleLogout}
                                variant="ghost"
                                className="w-full justify-start text-destructive hover:text-destructive"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </Button>
                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    {/* Top Navigation Bar */}
                    <div className="bg-card shadow-sm p-4 flex justify-between md:justify-end items-center space-x-2">
                        <div className="md:hidden w-8"></div> {/* Spacer for mobile */}
                        <div className="flex items-center space-x-2">
                            <ThemeToggle />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={session?.user?.image || "https://github.com/shadcn.png"} alt="@shadcn" />
                                            <AvatarFallback>{session?.user?.name}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{session?.user?.name || ""}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {session?.user?.email || ""}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem >
                                        <button onClick={handleLogout} className="w-full flex-row text-left">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <p>Log out</p>
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-4">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}