import lookup from "@/app/_data/lookup";
import HeadingDesc from "./headingDesc";
import { LogoDescProps } from "@/types";

function LogoDesc({ onHandleInputChange, formData }: LogoDescProps) {
  return (
    <div className="my-10">
      <HeadingDesc
        title={lookup.LogoDescTitle}
        description={lookup.LogoDescDesc}
      />

      <input
        type="text"
        placeholder="Describe your logo"
        className="p-4 border rounded-lg mt-5 w-full"
        value={formData?.desc || ""}
        onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  );
}

export default LogoDesc;
