"use client";

import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

export type Step = {
  label: string;
  description?: string;
};

interface StepperProps {
  steps: Step[];
  activeStep: number;
  onStepClick?: (step: number) => void;
}

export function Stepper({ steps, activeStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full">
      <ol className="flex w-full items-center">
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isCurrent = index === activeStep;
          const isClickable = onStepClick && (isCompleted || index === activeStep + 1);

          return (
            <li
              key={index}
              className={cn("flex items-center", index < steps.length - 1 ? "w-full" : "")}
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                  isCompleted
                    ? "bg-primary text-primary-foreground border-primary"
                    : isCurrent
                      ? "bg-primary-foreground text-primary border-primary"
                      : "bg-background border-input text-muted-foreground"
                )}
                onClick={isClickable ? () => onStepClick(index) : undefined}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? <CheckIcon className="h-5 w-5" /> : index + 1}
              </div>

              {step.label && (
                <div
                  className={cn("ml-2 min-w-0", index < steps.length - 1 ? "hidden sm:block" : "")}
                >
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isCurrent ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                  {step.description && (
                    <p className="text-muted-foreground hidden text-xs md:block">
                      {step.description}
                    </p>
                  )}
                </div>
              )}

              {index < steps.length - 1 && (
                <div className="mr-2 ml-2 flex-1">
                  <div
                    className={cn("h-0.5 w-full", index < activeStep ? "bg-primary" : "bg-input")}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
