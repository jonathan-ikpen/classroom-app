"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

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
  status: z.enum(["LECTURER", "STUDENT"]),
  matno: z.string().min(1, { message: "Invalid mat number" }),
  class: z.string().min(1, { message: "Invalid class name" }),
});

const OnboardingForm = () => {
  const router = useRouter();
  const [authState, loading] = useAuthState(auth);

  // if (!authState) {
  //   router.push("/auth");
  // }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      status: "STUDENT",
      matno: "",
      class: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      //   logic here

      toast.success("account created");

      // Routing after success
      if (values.status === "STUDENT") {
        router.push("/student");
      }
      if (values.status === "LECTURER") {
        router.push("/lecturer");
      }
    } catch (error) {
      console.log(error);
      toast.error("error: " + error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <p className="text-center text-xl font-bold">Tell us more about you</p>

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
          name="status"
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

        {form.watch("status") === "STUDENT" && (
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

        {form.watch("status") === "LECTURER" && (
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

        <Button disabled={loading} type="submit" className="w-full bg-prim">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default OnboardingForm;
