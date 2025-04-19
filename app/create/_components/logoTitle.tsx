"use client";

import lookup from "@/app/_data/lookup";
import HeadingDesc from "./headingDesc";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface LogoTitleProps {
  onHandleInputChange: (value: string) => void;
  formData: {
    title?: string;
  };
}

function LogoTitle({ onHandleInputChange, formData }: LogoTitleProps) {
  const searchParam = useSearchParams();
  const [title, setTitle] = useState<string>(formData?.title || searchParam?.get("title") || "");

  useEffect(() => {
    if (title) {
      onHandleInputChange(title);
    }
  }, []);

  const handleChange = (value: string) => {
    setTitle(value);
    onHandleInputChange(value);
  };

  return (
    <div>
      <HeadingDesc
        title={lookup.LogoTitle}
        description={lookup.LogoTitleDesc}
      />

      <input
        type="text"
        placeholder={lookup.InputTitlePlaceholder}
        className="p-4 border rounded-lg mt-5 w-full"
        value={title}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

export default LogoTitle;