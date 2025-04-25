"use client";

import { UserDetailContext } from "@/app/_context/userDetailContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext } from "react";

function Info() {
  const { userDetails } = useContext(UserDetailContext);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary text-center sm:text-left">
        Hello, {userDetails?.name}
      </h2>
      <Link href="/create" className="self-center sm:self-auto">
        <Button className="px-4 py-2 text-sm sm:text-base font-medium">
          + Create New Logo
        </Button>
      </Link>
    </div>
  );
}

export default Info;
