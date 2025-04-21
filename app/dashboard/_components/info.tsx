"use client";

import { UserDetailContext } from "@/app/_context/userDetailContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext } from "react";

function Info() {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  return (
    <div>
      <h2 className="font-bold text-4xl text-primary">
        Hello {userDetails?.name}
      </h2>

      <div className="flex justify-between items-center mt-6">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <Link href="/create">
          <Button className="cursor-pointer">+ Create New Logo</Button>
        </Link>
      </div>
    </div>
  );
}
export default Info;
