import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {MdAssignmentAdd} from "react-icons/md";
import {SiTestcafe} from "react-icons/si";
import {GoVideo} from "react-icons/go";

const data = [
  {
    name: "view assignments",
    icon: <MdAssignmentAdd/>,
    link: "",
  },
  {
    name: "view lecture materials",
    icon: <GoVideo />,
    link: "",
  },{
    name: "view Quizes",
    icon: <SiTestcafe />,
    link: "",
  },
];

const ViewButtons = () => {
  return (
    <div className="p-7 grid gap-4 grid-cols-2 lg:grid-cols-3">
      {data.map((dat) => (
        <Card className=" sm:h-40 flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{dat.name}</CardTitle>
            {dat.icon}
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              View
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ViewButtons;
