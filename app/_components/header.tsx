"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const { user } = useUser();
  return (
    <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm ">
      <Link className="cursor-pointer" href={"/"}>
        <Image src={"/logo.svg"} alt="logo" width={130} height={100} />
      </Link>
      <div className="flex gap-3 items-center">
        {user ? (
          <Button
            className="p-5 font-semibold cursor-pointer"
            variant="outline"
          >
            Dashboard
          </Button>
        ) : (
          <Button className="p-5 font-semibold cursor-pointer">
            Get Started
          </Button>
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
