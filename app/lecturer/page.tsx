"use client"
import React from "react";
import { PopoverComp } from "./components/popup-button";
import ViewButtons from "./components/view-buttons";
import PrivateRoute from "@/utils/PrivateRoute";
import QuizView from "@/components/shared/quiz";


const LecturerPage = () => {
  return (
    <>
      <ViewButtons />
    </>
  );
};

export default PrivateRoute(LecturerPage);
