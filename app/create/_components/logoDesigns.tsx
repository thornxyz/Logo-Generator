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
    <div>
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
            className={`p-1 cursor-pointer hover:border-2 border-red-700 rounded-xl ${
              selectedOption === design.title &&
              "border-2 rounded-xl border-red-700"
            }`}
          >
            <Image
              src={design.image}
              alt={design.title}
              width={70}
              height={70}
              className="w-full rounded-xl object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoDesigns;
