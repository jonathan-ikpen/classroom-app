import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Copy} from "lucide-react";
import {FaYoutube} from "react-icons/fa";
import {ReactElement} from "react";


const YouTubeEmbed = () => {
    return (

        <DialogContent>
                <DialogHeader>
                    <DialogTitle>YouTube</DialogTitle>
                    <DialogDescription>
                        Paste YouTube Embed
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue='<iframe width="560" height="315" src="https://www.youtube.com/embed/Dxcc6ycZ73M?si=s8UEr4WK_3A3Llq-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3" variant={"secondary"}>
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button">
                            Add
                        </Button>
                    </DialogClose>
                </DialogFooter>
        </DialogContent>

    )
}

export default YouTubeEmbed