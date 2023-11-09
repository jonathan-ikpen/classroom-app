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

const data = [
  {
    name: "view assignments",
    icon: "",
    link: "",
  },
  {
    name: "view lecture materials",
    icon: "",
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
            <svg
              className=" w-4 h-4 text-zinc-500 dark:text-zinc-400"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" x2="8" y1="13" y2="13" />
              <line x1="16" x2="8" y1="17" y2="17" />
              <line x1="10" x2="8" y1="9" y2="9" />
            </svg>
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
