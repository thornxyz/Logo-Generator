"use client";

import { UserDetailContext } from "@/app/_context/userDetailContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function LogoList() {
  const { userDetails } = useContext(UserDetailContext);
  const [logoList, setLogoList] = useState<
    Array<{ image: string; title: string; desc: string }>
  >([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (userDetails?.email) {
      GetUserLogos(userDetails.email);
    }
  }, [userDetails]);

  const GetUserLogos = async (email: string) => {
    try {
      const res = await axios.post("/api/getLogos", { email });
      setLogoList(res.data);
    } catch (err) {
      console.error("Error fetching logos:", err);
    }
  };

  const ViewLogo = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  return (
    <div className="mt-10">
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {logoList?.length > 0
            ? logoList.map((logo, index) => (
                <div
                  key={index}
                  className="hover:scale-105 transition-all cursor-pointer"
                  onClick={() => ViewLogo(logo.image)}
                >
                  <Image
                    src={logo.image}
                    width={400}
                    height={200}
                    className="w-full rounded-xl"
                    alt="logo"
                  />
                  <h2 className="text-center text-lg font-medium mt-2">
                    {logo.title}
                  </h2>
                  <p className="text-sm text-gray-500 text-center">
                    {logo.desc}
                  </p>
                </div>
              ))
            : [1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className="bg-slate-200 rounded-xl w-full h-[200px] animate-pulse"
                ></div>
              ))}
        </div>

        {selectedImage && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="mb-4">Logo Preview</DialogTitle>
            </DialogHeader>
            <div className="w-full flex justify-center">
              <Image
                src={selectedImage}
                alt="Logo preview"
                width={500}
                height={500}
                className="rounded-xl"
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

export default LogoList;
