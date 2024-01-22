"use client"
import React from "react";
import ViewButtons from "@/app/view/components/view-buttons";
import PrivateRoute from "@/utils/PrivateRoute";
import axios from "@/lib/axios";
import { useAuth } from "@/utils/contextfile";

const getCourses = async (id: number) => {
    const fetch = await axios.get(`/course/${id}`)
    return fetch.data.course
}


const LecturerPage = async () => {
    const { isAuthenticated, user } = useAuth()
    const course = await getCourses(user.id)

  return (
    <>
      <ViewButtons courseId={course.id} />
    </>
  );
};

export default PrivateRoute(LecturerPage);
