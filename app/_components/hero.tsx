"use client";

import { Button } from "@/components/ui/button";
import lookup from "../_data/lookup";
import { useState } from "react";
import Link from "next/link";

function Hero() {
  const [logoTitle, setLogoTitle] = useState<string>();
  return (
    <div className="flex items-center sm:mt-24 mt-10 flex-col gap-5 px-4">
      <h2 className="text-primary text-3xl sm:text-4xl md:text-5xl text-center font-bold">
        {lookup.HeroHeading}
      </h2>
      <h2 className="text-3xl text-gray-600 sm:text-4xl md:text-5xl text-center font-bold">
        {lookup.HeroSubheading}
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-500 text-center">
        {lookup.HeroDesc}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-2xl sm:mt-10 mt-5">
        <input
          placeholder={lookup.InputTitlePlaceholder}
          className="p-3 border rounded-md w-full shadow-md"
          onChange={(e) => setLogoTitle(e?.target.value)}
        />
        <Link href={"/create?title=" + logoTitle}>
          <Button className="p-4 sm:px-8 sm:py-6 text-lg cursor-pointer w-full sm:w-auto">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default Hero;
