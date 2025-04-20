"use client";

import { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/userDetailContext";
import prompt from "../_data/prompt";
import { FormData } from "@/types";
import axios from "axios";

function GenerateLogo() {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const [formData, setFormData] = useState<FormData | null>(null);

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
    const PROMPT = prompt.LOGO_PROMPT.replace(
      "{logoTitle}",
      formData?.title || ""
    )
      .replace("{logoDesc}", formData?.desc || "")
      .replace("{logoColor}", formData?.palette || "")
      .replace("{logoDesign}", formData?.design?.title || "")
      .replace("{logoPrompt}", formData?.design?.prompt || "")
      .replace("{logoIdea}", formData?.idea || "");

    // console.log(PROMPT);

    const result = await axios.post("/api/getPrompt", { prompt: PROMPT });

    console.log(result.data);
  };

  return <div>GenerateLogo</div>;
}

export default GenerateLogo;
