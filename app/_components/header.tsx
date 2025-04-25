"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "next-themes";

function Header() {
  const { user } = useUser();
  const { theme } = useTheme();
  return (
    <div className="px-2 sm:px-10 lg:px-32 xl:px-48 2xl:px-56 m-1 rounded-2xl p-4 flex items-center justify-between shadow-lg ">
      <Link className="cursor-pointer" href={"/"}>
        <Image
          src="/logo.svg"
          alt="logo"
          width={130}
          height={100}
          className={theme === "dark" ? "invert-colors" : ""}
        />
      </Link>

      <div className="flex gap-2 sm:gap-6 items-center">
        <ThemeToggle />
        {user ? (
          <Link href={"/dashboard"}>
            <Button
              className="px-4 py-2 sm:p-2 text-base cursor-pointer flex items-center gap-2"
              variant="outline"
            >
              <LayoutDashboard className="block sm:hidden w-5 h-5" />

              <span className="hidden sm:block">Dashboard</span>
            </Button>
          </Link>
        ) : (
          <SignInButton mode="modal" forceRedirectUrl="/">
            <Button className="p-5 font-semibold cursor-pointer">
              Get Started
            </Button>
          </SignInButton>
        )}
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "40px",
                height: "40px",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
export default Header;
