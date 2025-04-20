"use client";

import { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/userDetailContext";
import prompt from "../_data/prompt";
import { FormData } from "@/types";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, LayoutDashboard, Loader2 } from "lucide-react";
import Link from "next/link";

function GenerateLogo() {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && userDetails?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage) as FormData);
      }
    }
  }, [userDetails]);

  useEffect(() => {
    if (formData?.title) {
      GenerateAILogo();
    }
  }, [formData]);

  const GenerateAILogo = async () => {
    setLoading(true);
    //prettier-ignore
    const PROMPT = prompt.LOGO_PROMPT
      .replace("{logoTitle}",formData?.title || "")
      .replace("{logoDesc}", formData?.desc || "")
      .replace("{logoColor}", formData?.palette || "")
      .replace("{logoDesign}", formData?.design?.title || "")
      .replace("{logoPrompt}", formData?.design?.prompt || "")
      .replace("{logoIdea}", formData?.idea || "");

    // console.log(PROMPT);

    const result = await axios.post("/api/getPrompt", { prompt: PROMPT });
    const imagePrompt = result.data.prompt;

    console.log(imagePrompt);

    const image = await axios.post("/api/generateImg", {
      prompt: imagePrompt,
      email: userDetails?.email,
      title: formData?.title,
      desc: formData?.desc,
    });

    console.log(image.data);
    setLogoImage(image.data.imageUrl);
    setLoading(false);
  };

  return (
    <div className="mt-5">
      {loading && (
        <div className="flex flex-col items-center gap-2 mt-10">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Generating your logo...
          </p>
        </div>
      )}
      {!loading && (
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-3xl font-bold">Your Logo Has been Generated!</h1>
          <Image
            src={logoImage || "/placeholder.png"}
            alt="logo"
            width={300}
            height={300}
            className="rounded-lg"
          />
          <div className="flex gap-20">
            <Button
              className="p-5 cursor-pointer"
              onClick={() => {
                if (logoImage) {
                  const link = document.createElement("a");
                  link.href = logoImage;
                  link.download = "generated-logo.png";
                  link.click();
                }
              }}
            >
              <Download />
              Download
            </Button>
            <Link href={"/dashboard"}>
              <Button className="p-5 cursor-pointer" variant="outline">
                <LayoutDashboard />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default GenerateLogo;
