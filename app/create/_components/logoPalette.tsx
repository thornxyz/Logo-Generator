import lookup from "@/app/_data/lookup";
import HeadingDesc from "./headingDesc";
import colors from "@/app/_data/colors";
import { useState } from "react";
import { LogoPaletteProps } from "@/types";

function LogoPalette({ onHandleInputChange, formData }: LogoPaletteProps) {
  const [selectedOption, setSelectedOption] = useState<string>(
    formData?.palette ?? ""
  );
  return (
    <div>
      <HeadingDesc
        title={lookup.LogoColorPaletteTitle}
        description={lookup.LogoColorPaletteDesc}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {colors.map((palette, index) => (
          <div
            className={`flex cursor-pointer p-1 ${
              selectedOption === palette.name &&
              "border-2 rounded-lg border-primary"
            }`}
            key={index}
          >
            {palette?.colors.map((item, colorIndex) => (
              <div
                className="h-24 w-full"
                style={{ backgroundColor: item }}
                key={colorIndex}
                onClick={() => {
                  setSelectedOption(palette.name);
                  onHandleInputChange(palette.name);
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoPalette;