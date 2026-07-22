import React from "react";
import { CHECKOUT_STEPS } from "../constants/checkoutConfig";

export default function CheckoutStepper({ currentStep = 1 }) {
  return (
    <div className="w-full select-none mb-8">
      <div className="flex items-center justify-between relative">
        {/* Background Line */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
        
        {/* Progress Line */}
        <div
          className="absolute left-0 top-1/2 h-0.5 bg-emerald-700 -translate-y-1/2 z-0 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (CHECKOUT_STEPS.length - 1)) * 100}%` }}
        />

        {CHECKOUT_STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-350 ${
                  isCompleted
                    ? "bg-emerald-700 text-white"
                    : isActive
                    ? "bg-emerald-50 text-emerald-800 border-2 border-emerald-705 ring-4 ring-emerald-50"
                    : "bg-white text-slate-400 border border-slate-200"
                }`}
              >
                {step.id}
              </div>
              <span
                className={`mt-2 text-[10px] font-bold uppercase tracking-wider hidden sm:block ${
                  isActive ? "text-emerald-800" : isCompleted ? "text-emerald-700" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
