"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { finalPageProps } from "@/types";
import Link from "next/link";

function FinalStep({ formData }: finalPageProps) {
  const { user } = useUser();

  useEffect(() => {
    if (formData?.title && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <div className="flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-lg bg-white dark:bg-muted">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          🎉 Almost there!
        </h1>
        <p className="text-center text-sm sm:text-base text-muted-foreground mb-6">
          You're one step away from generating your awesome logo.
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
          {user ? (
            <Link href="/generate-logo" className="w-full">
              <Button className="text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full cursor-pointer">
                Generate your Logo
              </Button>
            </Link>
          ) : (
            <>
              <SignInButton mode="modal" forceRedirectUrl="/generate-logo">
                <Button className="text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full cursor-pointer">
                  Sign in to Generate your Logo
                </Button>
              </SignInButton>
              <div className="text-center text-sm text-muted-foreground mt-2">
                Please sign in to continue
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FinalStep;
