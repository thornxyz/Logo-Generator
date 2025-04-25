"use client";

import { Button } from "@/components/ui/button";
import LogoTitle from "./_components/logoTitle";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Suspense, useState } from "react";
import LogoDesc from "./_components/logoDesc";
import LogoPalette from "./_components/logoPalette";
import LogoDesigns from "./_components/logoDesigns";
import LogoIdeas from "./_components/logoIdeas";
import FinalStep from "./_components/finalPage";
import { FormData } from "@/types";

function Page() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});

  const onHandleInputChange = (field: string, value: any): void => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        [field]: value,
      };
      console.log("Updated form data:", newData);
      return newData;
    });
  };

  const handleContinue = () => {
    switch (step) {
      case 1:
        if (!formData.title?.trim()) {
          alert("Please enter a logo title.");
          return;
        }
        break;
      case 2:
        if (!formData.desc?.trim()) {
          alert("Please enter a logo description.");
          return;
        }
        break;
      case 3:
        if (!formData.palette || formData.palette.length === 0) {
          alert("Please choose a color palette.");
          return;
        }
        break;
      case 4:
        if (
          !formData.design ||
          !formData.design.title ||
          !formData.design.prompt ||
          !formData.design.image
        ) {
          alert("Please select a valid design style.");
          return;
        }
        break;
      case 5:
        if (!formData.idea?.trim()) {
          alert("Please provide a logo idea or inspiration.");
          return;
        }
        break;
    }

    setStep(step + 1);
  };

  return (
    <div className="my-20 p-6 sm:p-10 border-2 rounded-xl 2xl:mx-72">
      {step === 1 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <LogoTitle
            onHandleInputChange={(v) => onHandleInputChange("title", v)}
            formData={formData as FormData}
          />
        </Suspense>
      ) : step === 2 ? (
        <LogoDesc
          onHandleInputChange={(v) => onHandleInputChange("desc", v)}
          formData={formData as FormData}
        />
      ) : step === 3 ? (
        <LogoPalette
          onHandleInputChange={(v) => onHandleInputChange("palette", v)}
          formData={formData as FormData}
        />
      ) : step === 4 ? (
        <LogoDesigns
          onHandleInputChange={(v) => onHandleInputChange("design", v)}
          formData={formData as FormData}
        />
      ) : step === 5 ? (
        <LogoIdeas
          onHandleInputChange={(v) => onHandleInputChange("idea", v)}
          formData={formData as FormData}
        />
      ) : step === 6 ? (
        <FinalStep
          onHandleInputChange={(v) => onHandleInputChange("", v)}
          formData={formData as FormData}
        />
      ) : null}

      <div className="flex items-center justify-between mt-6">
        {step !== 1 && (
          <Button
            className="px-6 py-5 cursor-pointer"
            variant="outline"
            onClick={() => setStep(step - 1)}
          >
            <ArrowLeft className="mr-2" />
            Previous
          </Button>
        )}
        {step !== 6 && (
          <Button className="px-6 py-5 cursor-pointer" onClick={handleContinue}>
            Continue
            <ArrowRight className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default Page;
