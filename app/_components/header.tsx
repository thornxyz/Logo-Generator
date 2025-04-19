import { Button } from "@/components/ui/button";
import Image from "next/image";

function Header() {
  return (
    <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm ">
      <Image src={"/logo.svg"} alt="logo" width={130} height={100} />
      <Button className="py-6 text-base font-mono cursor-pointer">
        Get Started
      </Button>
    </div>
  );
}
export default Header;
