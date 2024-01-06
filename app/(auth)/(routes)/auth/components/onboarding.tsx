"use client"
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/contextfile";


import axios from "@/lib/axios"

import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler  } from "react-hook-form";

import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import React from "react";

// enum userType {
//     'LECTURER',
//     'STUDENT'
// }


type Data = {
    fname: string,
    lname: string,
    user_type: string,
    matno: string,
    course: string,
}

export default function OboardingForm() {
    const { isAuthenticated, user, login, logout } = useAuth();
    const router = useRouter()
    console.log(user)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Data>({
        defaultValues: {
            fname: "",
            lname: "",
            user_type: "STUDENT",
            matno: "",
            course: "",
        }
    })

    const onSubmit: SubmitHandler<Data> = async (values) => {
        // console.log(values)

        try {
            //   logic here
            // { firstname, lastname, email, photoUrl, user_type, matric_no, course_code }
            const data = {
                firstname: values.fname,
                lastname: values.lname,
                matric_no: values.matno,
                course_code: values.course,
                user_type: values.user_type,
            }
            console.log(data)
            console.log(await user.id)
            const res = await axios.patch(`/user/${user.id}`, data)
                .then(function (response) {
                    // handle success
                    console.log(response);
                    toast.success("account created");
                })
                .catch(function (error) {
                    // handle error
                    console.log(error.response.data);
                    throw new Error(error.response.data)
                })


            // console.log(res)
            toast.success("account created");

            // // Routing after success
            // if (res.statusText == "OK") {
            //     if (values.user_type === "STUDENT") {
            //       router.push("/student");
            //     }
            //     if (values.user_type === "LECTURER") {
            //       router.push("/lecturer");
            //     }
            // }
        } catch (error) {
            console.log(await error);
            toast.error("" + error);
        }
    }



    return (
        <form className="w-full mt-24 space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <p className=" text-center text-xl font-bold">Tell us more about you</p>
            <div className="flex flex-col gap-1">
                <label>First name</label>
                <Input placeholder="John" {...register("fname", { required: true })} />
                {errors.fname && <span className=" text-red-600 text-xs ">Invalid first name</span>}
            </div>
            <div className="flex flex-col gap-1">
                <label>Last name</label>
                <Input placeholder="Doe" {...register("lname", { required: true })} />
                {errors.lname && <span className=" text-red-600 text-xs ">Invalid last name</span>}
            </div>

            <div className="flex flex-col gap-1">
                <label>Who are you?</label>
                <select {...register("user_type", { required: true })} placeholder="Lecturer or Student" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="LECTURER">lecturer</option>
                    <option value="STUDENT">student</option>
                </select>
            </div>

            {watch("user_type") === "STUDENT" && (
                <div className="flex flex-col gap-1">
                    <label>Matric no</label>
                    <Input placeholder="M.20 / CSIT / 14533" {...register("matno", { required: true })} />
                    {errors.matno && <span className=" text-red-600 text-xs ">Invalid Matric no</span>}
                </div>
            )}
            {watch("user_type") === "LECTURER" && (
                <div className="flex flex-col gap-1">
                    <label>Class</label>
                    <Input placeholder="COM 101" {...register("course", { required: true })} />
                    {errors.course && <span className=" text-red-600 text-xs ">Invalid class name</span>}
                </div>
            )}

            <Button type="submit" className="w-full bg-prim hover:bg-[#222]">
                Submit
            </Button>
        </form>
    )
}