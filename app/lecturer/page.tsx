import React from "react";
import { PopoverComp } from "./components/popup-button";
import ViewButtons from "./components/view-buttons";
import QuizView from "@/components/shared/quiz";


const LecturerPage = () => {
  return (
    <div className="w-full max-h-screen mt-24 flex flex-col fjustify-center fitems-center">
      <ViewButtons />
      <PopoverComp />
        {/*<QuizView/>*/}
    </div>
  );
};

export default LecturerPage;
