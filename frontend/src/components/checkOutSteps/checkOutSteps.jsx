import React from "react";
import { TiTick } from "react-icons/ti";
const CheckOutSteps = ({ currentStep }) => {
  const steps = ["İsim", "Detaylar"];
  return (
    <React.Fragment>
      <div className="flex justify-between">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step_item ${currentStep === i + 1 && "active"} ${
              i + 1 < currentStep && "completed"
            }`}
          >
            <div className="step">
              {i + 1 < currentStep ? <TiTick size={30} /> : i + 1}
            </div>
            <p className="text-gray-500 ">{step}</p>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default CheckOutSteps;
