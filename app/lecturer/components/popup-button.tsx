import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AiOutlinePlus } from "react-icons/ai";
import { MdAssignmentAdd } from "react-icons/md";
import { SiTestcafe } from "react-icons/si";
import { GoVideo } from "react-icons/go";

const data = [
  {
    name: "Assignment",
    icon: <MdAssignmentAdd />,
    component: "",
  },
  {
    name: "Test quiz",
    icon: <SiTestcafe />,
    component: "",
  },
  {
    name: "Lecture Material",
    icon: <GoVideo />,
    component: "",
  },
];

export function PopoverComp() {
  return (
    <Popover>
      <PopoverTrigger asChild className="fixed bottom-4 right-4">
        <Button className="border-2 border-prim rounded-xl grid place-content-center w-14 h-14 bg-[#333]">
          <AiOutlinePlus className="h-6 w-6  text-slate-100" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit mr-4 mb-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            {data.map((dat) => (
              <div className="flex gap-1 p-4">
                <Button variant={"ghost"} className="text-xl">
                  {dat.icon}
                </Button>
                <Button variant={"ghost"} className="text-xl">
                  {dat.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
