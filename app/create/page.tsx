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
    if (step === 1 && !formData.title) {
      alert("Please enter a title");
      return;
    }
    setStep(step + 1);
  };

  return (
    <div className="mt-28 p-10 border rounded-xl 2xl:mx-72">
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

      <div className="flex items-center justify-between mt-10">
        {step !== 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ArrowLeft />
            Previous
          </Button>
        )}
        {step !== 6 && (
          <Button onClick={handleContinue}>
            <ArrowRight />
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}

export default Page;
