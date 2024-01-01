"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

import axios from "@/lib/axios"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const formSchema = z.object({
  fname: z.string().min(1, { message: "Invalid first name" }),
  lname: z.string().min(1, { message: "Invalid last name" }),
  user_type: z.enum(["LECTURER", "STUDENT"]),
  matno: z.string().min(1, { message: "Invalid mat number" }),
  class: z.string().min(1, { message: "Invalid class name" }),
});

const OnboardingForm = () => {
  const router = useRouter();
  const [userAuth, loading] = useAuthState(auth);
  console.log(userAuth)

  // if (!authState) {
  //   router.push("/auth");
  // }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      user_type: "STUDENT",
      matno: "",
      class: "",
    },
  });


  // const handleSubmission = (values: z.infer<typeof formSchema>) => {
  //     console.log(values)
  // }

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
      console.log("Hi from submit func")
    console.log(values);

    try {

      //   logic here
        const data = {
            email: userAuth?.email,
            username: values.fname + userAuth?.uid,
            first_name: values.fname,
            last_name: values.lname,
            department: values.class ?? values.matno,
            status: true,
            user_type: values.user_type,
        }

        console.log(data)
        const res = await axios.post('https://codehashira.pythonanywhere.com/register', data)

        console.log(res)
      toast.success("account created");

      // // Routing after success
      // if (values.status === "STUDENT") {
      //   router.push("/student");
      // }
      // if (values.status === "LECTURER") {
      //   router.push("/lecturer");
      // }
    } catch (error) {
      console.log(error);
      toast.error("error: " + error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full mt-24 space-y-8"
      >
        <p className=" text-center text-xl font-bold">Tell us more about you</p>

        <FormField
          control={form.control}
          name="fname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl className="">
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl className="">
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who are you?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Lecturer or Student" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="LECTURER">Lecturer</SelectItem>
                  <SelectItem value="STUDENT">Student</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("user_type") === "STUDENT" && (
          <FormField
            control={form.control}
            name="matno"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matric No</FormLabel>
                <FormControl className="">
                  <Input placeholder="M.20 / CSIT / 14533" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {form.watch("user_type") === "LECTURER" && (
          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class name</FormLabel>
                <FormControl className="">
                  <Input placeholder="COM 101" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full bg-prim">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default OnboardingForm;
