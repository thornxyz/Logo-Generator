"use client";

import lookup from "@/app/_data/lookup";
import HeadingDesc from "./headingDesc";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";

interface PricingModelProps {
  formData: {
    title?: string;
    [key: string]: any;
  };
}

function PricingModel({ onHandleInputChange, formData }: PricingModelProps) {
  const { user } = useUser();
  useEffect(() => {
    if (formData?.title && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, []);

  return (
    <div>
      <HeadingDesc
        title={lookup.LogoPricingModelTitle}
        description={lookup.LogoPricingModelDesc}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
        {lookup.pricingOption.map((pricing, index) => (
          <div className="flex flex-col items-center p-5 border rounded-xl">
            <Image
              src={pricing.icon}
              alt={pricing.title}
              width={60}
              height={60}
            />
            <h2 className="font-medium text-2xl">{pricing.title}</h2>
            <div>
              {pricing.features.map((feature, index) => (
                <h2 className="text-lg mt-3 " key={index}>
                  {feature}
                </h2>
              ))}
            </div>
            {user ? (
              <Button className="mt-5">{pricing.button}</Button>
            ) : (
              <SignInButton
                mode="modal"
                forceRedirectUrl={"/generate-logo?type=" + pricing.title}
              >
                <Button className="mt-5">{pricing.button}</Button>
              </SignInButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default PricingModel;
