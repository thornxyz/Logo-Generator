"use client";

import lookup from "@/app/_data/lookup";
import HeadingDesc from "./headingDesc";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { PricingModelProps } from "@/types";
import Link from "next/link";

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
          <div
            key={index}
            className="flex flex-col items-center p-5 border rounded-xl"
          >
            <Image
              src={pricing.icon}
              alt={pricing.title}
              width={60}
              height={60}
            />
            <h2 className="font-medium text-2xl">{pricing.title}</h2>
            <div>
              {pricing.features.map((feature, featureIndex) => (
                <h2 key={featureIndex} className="text-lg mt-3">
                  {feature}
                </h2>
              ))}
            </div>
            {user ? (
              <Link href={"/generate-logo?type=" + pricing.title}>
                <Button className="mt-5">{pricing.button}</Button>
              </Link>
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
