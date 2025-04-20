"use client";

import { useUser } from "@clerk/nextjs";
import Header from "./_components/header";
import axios from "axios";
import { useEffect } from "react";

function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  useEffect(() => {
    user && CheckUserAuth();
  }, [user]);

  const CheckUserAuth = async () => {
    const result = await axios.post("/api/users", {
      name: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(result.data);
  };

  return (
    <div>
      <Header />
      <div className="px-10 lg:px-32 xl:px-48 2xl:px-56">{children}</div>
    </div>
  );
}
export default Provider;
