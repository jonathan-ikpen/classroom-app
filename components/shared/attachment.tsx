import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {MdAssignmentAdd} from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { PiLinkSimpleHorizontalLight } from "react-icons/pi";

const data = [
    {
        label: "YouTube",
        icon: <FaYoutube color="red" className="text-3xl" />,
        description: 'Paste YouTube Embed',
        placeholder: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Dxcc6ycZ73M?si=s8UEr4WK_3A3Llq-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        component: '',
        upload: false,
    },
    {
        label: "Upload",
        icon: <MdOutlineFileUpload className="text-3xl" />,
        description: 'Upload Files',
        placeholder: "",
        component: '',
        upload: true,
    },
    {
        label: "Link",
        icon: <PiLinkSimpleHorizontalLight className="text-3xl" />,
        description: 'Paste Resource URL',
        placeholder: 'https://youtu.be/Dxcc6ycZ73M?si=tv__7CeAnMXRVCOR',
        component: '',
        upload: false,
    },
]


const Attachments = () => {
    return (
        <div>
            <div className={"flex gap-8 items-center px-8 py-4"}>
                {data.map(dat => (

                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <div className={"p-4 cursor-pointer rounded-full border-2 border-slate-100 hover:bg-gray-100 "}>
                                    {dat.icon}
                                </div>
                                <span className={"text-xs"}>{dat.label}</span>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>{dat.label}</DialogTitle>
                                <DialogDescription>
                                    {dat.description}
                                </DialogDescription>
                            </DialogHeader>
                            {!dat.upload && (
                                <div className="flex items-center space-x-2">
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="link" className="sr-only">
                                            Link
                                        </Label>
                                        <Input
                                            id="link"
                                            defaultValue={dat.placeholder}
                                            readOnly
                                        />
                                    </div>
                                    <Button type="submit" size="sm" className="px-3" variant={"secondary"}>
                                        <span className="sr-only">Copy</span>
                                        <Copy className="h-4 w-4"/>
                                    </Button>
                                </div>
                            )}
                            {dat.upload && (
                                <div className="flex items-center space-x-2">
                                    <Input type="file" />
                                </div>
                            )}
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button">
                                        Add
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>

                    </Dialog>
                ))}
            </div>

        </div>
    )
}

export default Attachments