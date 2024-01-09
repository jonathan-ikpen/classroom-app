"use client"
import React, { useState } from "react";
import { useAuth} from "@/utils/contextfile";
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
import Link from "next/link";

const data = [
  {
    name: "view assignments",
    icon: <MdAssignmentAdd/>,
    link: "/view/assignments",
  },
  {
    name: "view lecture materials",
    icon: <GoVideo />,
    link: "/view/materials",
  },{
    name: "view Quizes",
    icon: <SiTestcafe />,
    link: "/view/quizes",
  },
];

const ViewButtons = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="p-7 grid gap-4 grid-cols-2 lg:grid-cols-3">
      {data.map((dat, i) => (
          <Link href={dat.link + `?id=${user.id}`} key={i}>
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
          </Link>
      ))}
    </div>
  );
};

export default ViewButtons;
