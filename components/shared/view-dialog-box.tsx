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
import Attachments from "@/components/shared/view-attachments";
import toast from "react-hot-toast";
import { useForm, SubmitHandler  } from "react-hook-form";
import QuizView from "@/components/shared/quiz"
import { useAuth } from "@/utils/contextfile";
import axios from "@/lib/axios"

interface CompProps {
    children?: ReactNode;
    icon: ReactElement,
    data: any,
    quiz: boolean,
    date: string
}

type Data = {
    title: string,
    instruction: string,
    user_type: string,
    class: string,
    youtubeEmbed?: string,
    file: [File],
    resourceLink?: string,
    filloutId?: string,
}

const DialogBox: React.FC<CompProps> = ({ icon, data, quiz, date  }) => {
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

    const quizTitleStyle = 'border-0 focus-visible:border-none rounded-none bg-gray-50 col-span-4 p-8 w-full border-b border-prim shadow-none';
    const notQuizTitleStyle = 'col-span-4 p-8 w-full border-none bg-gray-100 focus:border-none outline-0 focus:outline-0 active:border-none ring-0 ';

    const onSubmit: SubmitHandler<Data> = async (values) => {
        console.log(values)

    }

    return (
    <Dialog>
        <DialogTrigger asChild>
            <div>
                <Button variant={"ghost"} className="text-sm md:text-xl p-0 ">
                    {icon}
                </Button>
            </div>
        </DialogTrigger>
        {!quiz && <DialogContent className="fsm:max-w-[425px] max-w-[90%] h-[90%]">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
                <DialogHeader className="flex-none">
                    <DialogTitle className={"flex gap-6 text-4xl"}>{data.title}</DialogTitle>
                    <DialogDescription>
                        {date}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-grow flex flex-col gap-4 py-4">
                    {quiz && <div className="flex-none grid grid-cols-4 items-center">
                        <Input
                            id="link"
                            type={"text"}
                            placeholder={data.quizId}
                            value={data.quizId}
                            className="col-span-4 p-10 w-full border-0 bg-gray-50 border-b border-prim rounded-none ring-0 "
                            {...register("filloutId", {required: true})}
                        />
                    </div>}
                    <div className="flex-none grid grid-cols-4 items-center gap-4">

                        <Input
                            id="title"
                            className={quiz ? quizTitleStyle : notQuizTitleStyle}
                            placeholder={data.title}
                            value={data.title}
                            {...register("title", {required: true})}
                        />
                    </div>
                    <div className="flex-grow grid grid-cols-4 items-center gap-4">
                        <Textarea
                            id="instruction"
                            placeholder={data.instructions}
                            value={data.instructions}
                            className="col-span-4 h-full bg-slate-100 p-8 border-none"
                            {...register("instruction")}
                        />
                    </div>
                    {/*{!quiz && <div className="flex-none grid grid-cols-4 items-center">*/}
                    {/*    <Attachments register={register} content={data}/>*/}
                    {/*</div>}*/}

                </div>
                {/*<DialogFooter className="flex-none">*/}
                {/*    <Button type="submit" disabled={!isValid} className="bg-[#333] hover:bg-[#222]">Save changes</Button>*/}
                {/*</DialogFooter>*/}
            </form>
        </DialogContent>}
        {quiz && <DialogContent className="fsm:max-w-[425px] max-w-[90%] h-[90%]">
            <QuizView filloutId={data.quizId}/>
        </DialogContent>}
    </Dialog>
    )
}

export default DialogBox
