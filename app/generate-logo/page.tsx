"use client";

import { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/userDetailContext";
import prompt from "../_data/prompt";
import { FormData } from "@/types";
import axios from "axios";
import Image from "next/image";

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
    <div>
      <h2>{loading && "Loading..."}</h2>{" "}
      {!loading && (
        <Image
          src={logoImage || "/placeholder.png"}
          alt="logo"
          width={200}
          height={200}
        />
      )}
    </div>
  );
}

export default GenerateLogo;
