"use client"
import React from "react";
import axios from "@/lib/axios"
import { useAuth } from "@/utils/contextfile";
import CoursesThumbnails from "@/app/student/components/course-thumbnails";
import PrivateRoute from "@/utils/PrivateRoute";

const getCourses = async () => {
    const fetch = await axios.get('/course')
    return fetch.data.courses
}

const getCoursesEnrolled = async (id: number) => {
    const fetch = await axios.get(`/user/${id}`)
    return fetch.data.user.courses_enrolled
}

const StudentPage = async () => {
    const { isAuthenticated, user } = useAuth()
    const allCourses = await getCourses()
    const coursesEnrolled = await getCoursesEnrolled(user.id)
    // console.log(allCourses)
    // console.log(coursesEnrolled)

  return (
      <div className="">
        {/*<h1 className="text-xl">Student Dashboard</h1>*/}
          <CoursesThumbnails data={allCourses} enrolled={coursesEnrolled}/>
      </div>
  );
};

export default PrivateRoute(StudentPage);
