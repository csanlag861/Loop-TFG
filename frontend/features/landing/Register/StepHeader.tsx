"use client";

import { useStepper } from "./stepper";

const steps = ["Nombre de Usuario", "Email", "Contraseña"];

const StepHeader = () => {
  const stepper = useStepper();
  const currentIndex = stepper.state.current.index;

  return (
    <div className="flex justify-center gap-6 mb-6">
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`
                w-3 h-3 rounded-full
                ${isCompleted ? "bg-(--primary-color)" : ""}
                ${isActive ? "border-2 border-(--primary-color)" : ""}
                ${!isActive && !isCompleted ? "bg-(--gris-07)" : ""}
              `}
            />
            <span className="text-xs mt-2">{step}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StepHeader;
