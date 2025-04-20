"use client";

import { useUser } from "@clerk/nextjs";
import Header from "./_components/header";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserDetailContext } from "./_context/userDetailContext";
import { UserDetails } from "@/types";

function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    user && CheckUserAuth();
  }, [user]);

  const CheckUserAuth = async () => {
    const result = await axios.post("/api/users", {
      name: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
    });
    setUserDetails(result.data);
  };

  return (
    <div>
      <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
        <Header />
        <div className="px-10 lg:px-32 xl:px-48 2xl:px-56">{children}</div>
      </UserDetailContext.Provider>
    </div>
  );
}

export default Provider;
