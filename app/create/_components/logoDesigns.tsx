"use client";

import lookup from "@/app/_data/lookup";
import HeadingDesc from "./headingDesc";
import logoDesig from "@/app/_data/logoDesig";
import Image from "next/image";
import { useState } from "react";
import { LogoDesignsProps } from "@/types";

function LogoDesigns({ onHandleInputChange, formData }: LogoDesignsProps) {
  const [selectedOption, setSelectedOption] = useState<string>(
    formData?.design?.title ?? ""
  );
  return (
    <div className="max-w-4xl">
      <HeadingDesc
        title={lookup.LogoDesignTitle}
        description={lookup.LogoDesignDesc}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-10">
        {logoDesig.map((design, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(design.title);
              onHandleInputChange(design);
            }}
            className={`p-1 flex justify-center cursor-pointer rounded-xl border-2 ${
              selectedOption === design.title
                ? "border-red-700"
                : "border-transparent"
            } hover:border-red-700`}
          >
            <Image
              src={design.image}
              alt={design.title}
              width={100}
              height={100}
              className="w-full max-w-50 rounded-xl object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoDesigns;
