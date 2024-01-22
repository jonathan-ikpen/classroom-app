"use client"
import React from "react";
import OnboardingForm from "../components/onboarding";
import PrivateRoute from "@/utils/PrivateRoute";

const OnboardingPage = () => {
  return (
    <div className="px-7 flex max-w-xl mx-auto flex-col items-center justify-center w-full min-h-screen">
      <OnboardingForm />
    </div>
  );
};

// export default PrivateRoute(OnboardingPage);
export default OnboardingPage;
