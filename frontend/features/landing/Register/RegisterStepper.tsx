"use client";

import { Scoped } from "./stepper";
import StepForm from "./StepForm";
import StepHeader from "./StepHeader";

const RegisterStepper = () => {
  return (
    <Scoped>
      <div className="w-full max-w-md mx-auto">
        <StepHeader />
        <StepForm />
      </div>
    </Scoped>
  );
};

export default RegisterStepper;
