"use client";

import { useAuth } from "@/utils/contextfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter, usePathname } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import GoogleAuth from "./google-auth";
import toast from "react-hot-toast";
import {useState} from "react";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password can be at most 20 characters long" })
        .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value), {
            message:
                "Password must contain at least one lowercase letter, one uppercase letter, and one digit",
        }),
});

const LoginForm = ({ slug }: { slug?: string }) => {
    const { isAuthenticated, user: userC, login, logout } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false)



    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        if(slug === '/signup') {
            console.log("creating account...")
            try {
                const data = {
                    email: values.email,
                    password: values.password
                }
                const res = await axios.post('/login', data)
                console.log(await res.data.data)

                if (res.statusText == "OK" || res.data.success) {
                    login(await res.data.data)
                    toast.success("registration successful! redirecting...");
                    // router.push("/auth/new/");
                    console.log(await isAuthenticated)
                    console.log(await userC)
                }
            } catch(err: any) {
                console.log(err?.response?.data)
                toast.error("" + err?.response?.data);
            }
        }

        if(slug === '/login') {
            console.log("signing in...")
            try {

            } catch (err) {
                // console.log(err)
                // toast.error("" + err);
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                <p className="text-center text-xl font-bold">Enter Class</p>
                {/* Email  */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="name@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Password  */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl className="">
                                <Input placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Form Button  */}
                <Button disabled={loading} type="submit" className="w-full bg-prim">
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
