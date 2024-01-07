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
    confirm_password: z.string()
});

const LoginForm = ({ slug }: { slug?: string }) => {
    const { isAuthenticated, user, login, logout } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [slugL, setSlugL] = useState(slug)



    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm_password: ""
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        console.log(values);

        if(slugL == '/login') {
            console.log("signing in...")
            try {

                const data = {
                    email: values.email,
                    password: values.password
                }
                const res = await axios.post('/login', data)
                console.log(await res)
                console.log(await res.data)

                if (res.statusText == "OK" || res.data.success) {
                    login(await res.data.data)
                    toast.success("login successful! redirecting...");

                    // Routing after success
                    if (await res.data.data.role === "STUDENT") {
                        console.log('navigating to student dashboard')
                        router.push("/student");
                    }
                    if (await res.data.data.role === "LECTURER") {
                        console.log('navigating to lecturer dashboard')
                        router.push("/lecturer");
                    }
                }

            } catch (err: any) {
                console.log(err?.response?.data)
                toast.error("" + err?.response?.data);
            } finally {
                setLoading(false)
            }
        }

        if(slugL == '/signup') {
            console.log("creating account...")
            try {
                if(values.password !== values.confirm_password) {
                    form.setError('password', {
                        type: 'manual',
                        message: 'Make Password Match',
                    }, {
                        shouldFocus: true,
                    })
                    form.setError('confirm_password', {
                        type: 'manual',
                        message: 'Make Password Match',
                    }, {
                        shouldFocus: true,
                    })
                    toast.error("password does not match")
                    return
                }

                const data = {
                    email: values.email,
                    password: values.password
                }
                const res = await axios.post('/signup', data)
                console.log(await res.data.data)

                if (res.statusText == "OK" || res.data.success) {
                    login(await res.data.data)
                    toast.success("registration successful! redirecting...");
                    router.push("/auth/new/");
                }
            } catch(err: any) {
                console.log(err?.response?.data)
                toast.error("" + err?.response?.data);
            } finally {
                setLoading(false)
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
                                <Input placeholder="password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Confirm Password  */}
                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({field}) => (
                        <FormItem className={slugL == '/login' ? 'hidden' : ''}>
                            <FormControl className={slugL == '/login' ? 'hidden' : ''}>
                                <Input placeholder="confirm password" type="password" {...field} />
                            </FormControl>
                            <FormMessage/>
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
