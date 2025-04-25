"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const { user } = useUser();
  return (
    <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex items-center justify-between shadow-sm ">
      <Link className="cursor-pointer" href={"/"}>
        <Image src={"/logo.svg"} alt="logo" width={130} height={100} />
      </Link>
      <div className="flex gap-6 items-center">
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
