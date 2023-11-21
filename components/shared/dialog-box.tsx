"use client"
import React, {ReactNode} from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {ReactElement} from "react";
import Attachments from "@/components/shared/attachment";
import toast from "react-hot-toast";
import { useForm, SubmitHandler  } from "react-hook-form";
import axios from "axios"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

interface CompProps {
    children?: ReactNode;
    icon: ReactElement,
    name: string,
    description: string,
}

type Data = {
    title: string,
    instruction: string,
    user_type: string,
    class: string,
    youtubeEmbed?: string,
    file?: File,
    resourceLink?: string,
}

const DialogBox: React.FC<CompProps> = ({ children, icon, name, description  }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<Data>({
        defaultValues: {
            title: "",
            instruction: "",
            user_type: "LECTURER",
            class: "",
        }
    })

    const onSubmit: SubmitHandler<Data> = async (values) => console.log(values)

    return (

            <Dialog>
                <DialogTrigger asChild>
                    <div>
                        <Button variant={"ghost"} className="text-sm md:text-xl">
                            {icon}
                        </Button>
                        <Button variant={"ghost"} className="text-sm md:text-xl">
                            {name}
                        </Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="fsm:max-w-[425px] max-w-[90%] h-[90%]">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
                        <DialogHeader className="flex-none">
                            <DialogTitle className={"flex gap-6 text-4xl"}>{icon} {name}</DialogTitle>
                            <DialogDescription>
                                {description}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex-grow flex flex-col gap-4 py-4">
                            <div className="flex-none grid grid-cols-4 items-center gap-4">

                                <Input
                                    id="title"
                                    className="col-span-4 p-8 w-full border-none bg-gray-100 focus:border-none outline-0 focus:outline-0 active:border-none ring-0 "
                                    placeholder="Title"
                                    {...register("title", { required: true })}
                                />
                            </div>
                            <div className="flex-grow grid grid-cols-4 items-center gap-4">
                                <Textarea
                                    id="instruction"
                                    placeholder="Instructions (optional)"
                                    className="col-span-4 h-full bg-slate-100 p-8 border-none"
                                    {...register("instruction")}
                                />
                            </div>
                            <div className="flex-none grid grid-cols-4 items-center">
                                <Attachments register={register} />
                            </div>
                        </div>
                        <DialogFooter className="flex-none">
                            <Button type="submit" disabled={!isValid} className="bg-[#333] hover:bg-[#222]">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>


    )
}

export default DialogBox
