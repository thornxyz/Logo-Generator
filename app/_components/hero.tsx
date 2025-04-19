import { Button } from "@/components/ui/button";
import lookup from "../_data/lookup";

function Hero() {
  return (
    <div className="flex items-center mt-24 flex-col gap-5">
      <h2 className="text-blue-950 text-5xl text-center font-bold">
        {lookup.HeroHeading}
      </h2>
      <h2 className="text-5xl text-center font-bold">
        {lookup.HeroSubHeading}
      </h2>
      <p className="text-lg text-gray-500 text-center">{lookup.HeroDesc}</p>

      <div className="flex gap-6 w-full max-w-2xl mt-10">
        <input
          placeholder={lookup.InputTitlePlaceholder}
          className="p-3 border rounded-md w-full shadow-md"
        />
        <Button className="p-6 px-12 text-lg ">Get Started</Button>
      </div>
    </div>
  );
}
export default Hero;
