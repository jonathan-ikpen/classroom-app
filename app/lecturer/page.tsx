import React from "react";
import { PopoverComp } from "./components/popup-button";
import ViewButtons from "./components/view-buttons";


const LecturerPage = () => {
  return (
    <div className="w-full min-h-screen mt-24 flex flex-col fjustify-center fitems-center">
      <ViewButtons />
      <PopoverComp />
    </div>
  );
};

export default LecturerPage;
