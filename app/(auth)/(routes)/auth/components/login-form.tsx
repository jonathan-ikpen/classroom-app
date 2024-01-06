"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter, usePathname } from "next/navigation";

import {
  useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
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
import { Input } from "@/components/ui/input";
import GoogleAuth from "./google-auth";
import toast from "react-hot-toast";

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
  const router = useRouter();

  const [createUserWithEmailAndPassword, createdUser, cLoading, cError] = useCreateUserWithEmailAndPassword(auth);

  const [signInWithEmailAndPassword, loggedUser, loggedLoading, loggedError] = useCreateUserWithEmailAndPassword(auth)
  const formatError = async (error: any) => {
        // Extract the actual error message
        const errorMessage = error?.message.split(' (')[1].split(').')[0].replace('auth/', '');

        // Remove hyphens and create a user-friendly sentence
        const userFriendlyErrorMessage = errorMessage.replace(/-/g, ' ') + '.';

        // Display the error message in your UI
        // console.log(userFriendlyErrorMessage);

        return userFriendlyErrorMessage;

    }


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
              const res = await createUserWithEmailAndPassword(values.email, values.password)
              createdUser && console.log(res)
              createdUser && toast.success("account created");
              createdUser && console.log("account created")
              // createdUser && router.push("/auth/new");

              // console.log(cError)
              // cError && console.log(cError.message)
              cError && toast.error(" " + await formatError(cError));
          } catch(err) {
              // console.log(err)
              // toast.error("error: " + cError?.message);

              console.log(cError)
              toast.error("error: " + await formatError(cError));
          }
      }

      if(slug === '/login') {
          console.log("signing in...")
          try {
              const res = await signInWithEmailAndPassword(values.email, values.password)
              loggedUser && console.log(res)
              loggedUser && console.log("login successful")
              loggedUser && toast.success("logged in successfully")

              loggedError && toast.error(" " + await formatError(loggedError))
              loggedError && console.log(loggedError?.message)
          } catch (err) {
              // console.log(err)
              console.log(loggedError)
              toast.error("" + await formatError(loggedError));
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
        <Button disabled={cLoading || loggedLoading} type="submit" className="w-full bg-prim">
          Submit
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        {/* Google Auth  */}
        <GoogleAuth />
      </form>
    </Form>
  );
};

export default LoginForm;
