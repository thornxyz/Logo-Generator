import React, { useEffect, useState } from "react";
import HeadingDescription from "./headingDesc";
import Lookup from "@/app/_data/lookup";
import axios from "axios";
import Prompt from "@/app/_data/prompt";
import { Loader2Icon } from "lucide-react";
import { LogoIdeasProps, Design } from "@/types";

function LogoIdeas({ formData, onHandleInputChange }: LogoIdeasProps) {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    formData?.idea
  );

  useEffect(() => {
    generateLogoDesignIdea();
  }, []);

  const generateLogoDesignIdea = async (): Promise<void> => {
    if (!formData?.design?.title || !formData.title || !formData.desc) {
      console.error("Missing required form data");
      return;
    }
    setLoading(true);

    //prettier-ignore
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT
    .replace("{logoType}",formData.design.title)
      .replace("{logoTitle}", formData.title)
      .replace("{logoDesc}", formData.desc)
      .replace("{logoPrompt}", formData.design.prompt);

    try {
      const result = await axios.post("/api/getPrompt", {
        prompt: PROMPT,
      });

      const ideasArray = (result.data || []).map(
        (item: { idea: string }) => item.idea
      );

      console.log("ideasArray:", ideasArray);
      if (!ideas.length) {
        setIdeas(ideasArray);
      }
    } catch (error) {
      console.error("Error generating logo ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />
      <div className="flex items-center justify-center">
        {loading && <Loader2Icon className="animate-spin my-10" />}
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        {ideas.map((item, index) => (
          <h2
            key={index}
            onClick={() => {
              setSelectedOption(item);
              onHandleInputChange(item);
            }}
            className={`p-2 rounded-full border px-3 cursor-pointer
              hover:border-red-700 ${
                selectedOption === item && "border-red-700"
              }`}
          >
            {item}
          </h2>
        ))}
        <h2
          onClick={() => {
            setSelectedOption("Let AI Select the best idea");
            onHandleInputChange("Let AI Select the best idea");
          }}
          className={`p-2 rounded-full border px-3 cursor-pointer
            hover:border-red-700 ${
              selectedOption === "Let AI Select the best idea" &&
              "border-red-700"
            }`}
        >
          Let AI Select the best idea
        </h2>
      </div>
    </div>
  );
}

export default LogoIdeas;
