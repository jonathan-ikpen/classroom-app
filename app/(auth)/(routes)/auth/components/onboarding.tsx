"use client"
import { useRouter } from "next/navigation";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";


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
    const [userAuth, loading] = useAuthState(auth);
    const router = useRouter()

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
            const data = {
                email: userAuth?.email,
                username: userAuth?.displayName?.replace(/ +/g, "") ?? "",
                first_name: values.fname,
                last_name: values.lname,
                department: values.course ?? values.matno,
                status: true,
                user_type: values.user_type,
                password: 'classroom',
                password2: 'classroom'
            }
            console.log(data)
            const res = await axios.post('https://codehashira.pythonanywhere.com/register', data)

            console.log(res)
            toast.success("account created");

            // // Routing after success
            if (res.statusText == "OK") {
                if (values.user_type === "STUDENT") {
                  router.push("/student");
                }
                if (values.user_type === "LECTURER") {
                  router.push("/lecturer");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("error: " + error);
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