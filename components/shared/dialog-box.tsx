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

interface CompProps {
    children?: ReactNode;
    icon: ReactElement,
    name: string,
    description: string,
}
const DialogBox: React.FC<CompProps> = ({ children, icon, name, description  }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <Button variant={"ghost"} className="text-xl">
                        {icon}
                    </Button>
                    <Button variant={"ghost"} className="text-xl">
                        {name}
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="fsm:max-w-[425px] sm:max-w-[90%] sm:h-[90%] flex flex-col">
                <DialogHeader>
                    <DialogTitle className={"flex gap-6 text-4xl"}>{icon} {name}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">

                        <Input
                            id="name"
                            className="col-span-4 p-8 w-full border-none bg-gray-100 focus:border-none outline-0 focus:outline-0 active:border-none ring-0 "
                            placeholder="Title"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center h-80 gap-4">
                        <Textarea
                            id="username"
                            placeholder="Instructions (optional)"
                            className="col-span-4 h-full bg-slate-100 p-8 border-none"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <Attachments/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogBox
