"use client"
import React from "react";
import PrivateRoute from "@/utils/PrivateRoute";

const StudentPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex items-end gap-2 mb-7">
        <h1 className="text-xl">Student Dashboard</h1>
      </div>
    </div>
  );
};

export default PrivateRoute(StudentPage);
