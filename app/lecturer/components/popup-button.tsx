import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DialogBox from "@/components/shared/dialog-box";
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
    description: "Add a new assignment"
  },
  {
    name: "Test quiz",
    icon: <SiTestcafe />,
    component: "",
    description: "Add a new Test Quiz"
  },
  {
    name: "Lecture Material",
    icon: <GoVideo />,
    component: "",
    description: "Add a new Lecture Material"
  },
];

export function PopoverComp() {
  return (
    <Popover>
      <PopoverTrigger asChild className="fixed bottom-4 right-4">
        <Button className="border-2 border-prim rounded-xl grid place-content-center w-14 h-14 bg-[#333] hover:bg-[#222]">
          <AiOutlinePlus className="h-6 w-6  text-slate-100" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit mr-4 mb-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            {data.map((dat) => (
              <div className="flex gap-1 p-4">
                  <DialogBox icon={dat.icon} name={dat.name} description={dat.description} />
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
