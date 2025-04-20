"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { finalPageProps } from "@/types";
import Link from "next/link";

function finalStep({ formData }: finalPageProps) {
  const { user } = useUser();
  useEffect(() => {
    if (formData?.title && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold">Almost there!</h1>
      <div className="flex flex-col items-center justify-center ">
        {user ? (
          <Link href={"/generate-logo"}>
            <Button className="mt-5 p-8 text-2xl cursor-pointer">
              Generate your Logo
            </Button>
          </Link>
        ) : (
          <SignInButton mode="modal" forceRedirectUrl={"/generate-logo"}>
            <Button className="mt-5 p-8 text-2xl cursor-pointer">
              Generate your Logo
            </Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
export default finalStep;
