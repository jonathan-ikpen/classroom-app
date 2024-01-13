"use client"
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "@/lib/axios"
import { useAuth} from "@/utils/contextfile";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {MdAssignmentAdd} from "react-icons/md";
import {SiTestcafe} from "react-icons/si";
import {GoVideo} from "react-icons/go";
import Link from "next/link";

const dataa = [
  {
    name: "view assignments",
    icon: <MdAssignmentAdd/>,
    link: "/view/assignments",
  },
  {
    name: "view lecture materials",
    icon: <GoVideo />,
    link: "/view/materials",
  },{
    name: "view Quizes",
    icon: <SiTestcafe />,
    link: "/view/quizes",
  },
];

const tagCourses = (data: any, enroll: any) => {
  return data.map((course: any) => ({
    ...course,
    enrolled: enroll.some((enroll: any) => enroll.courseId === course.id)
  }))
}

const CoursesThumbnails = ({ data, enrolled }: any) => {
  const [isEnrolled, setIsEnrolled] = useState(false)
  const { isAuthenticated, user } = useAuth();
  const taggedData = tagCourses(data, enrolled)

  const handleEnroll = async (id: number, enrolled: boolean) => {
    if(enrolled || isEnrolled) return;

    try {
      const data = {
        enrollCourse: true,
        role: user.role,
        user_id: user.id,
        course_id: id
      }

      const fetch = await axios.post('/course', data)
      console.log(fetch)

      if (fetch.data.success || fetch.statusText == 'OK') {
        toast.success('You have been enrolled')
        setIsEnrolled(true)
      }
    } catch (err) {
      toast.error('Error enrolling course')
    }
  }


  return (
    <div className="p-7 grid gap-4 grid-cols-2 lg:grid-cols-3">
      {taggedData.map((dat: any, i: any) => (
          <Link href={dat.enrolled || isEnrolled ? `/view/?id=${dat.id}` : '#'} key={i} prefetch={false}>
            <Card className=" sm:h-40 flex flex-col justify-between">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{dat.title}</CardTitle>
                {dat.icon}
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" onClick={() => handleEnroll(dat.id, dat.enrolled)}>
                  {dat.enrolled || isEnrolled ? 'Open' : 'Enroll'}
                </Button>
              </CardContent>
            </Card>
          </Link>
      ))}
    </div>
  );
};

export default CoursesThumbnails;
