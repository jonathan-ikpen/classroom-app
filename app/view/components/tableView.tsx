"use client"
import {useAuth} from "@/utils/contextfile";
import {ReactElement, useEffect, useState} from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import DialogBox from "@/components/shared/view-dialog-box";


import { timeAgoAndFormattedDate } from "@/lib/time_formatter"
import { MdDelete } from "react-icons/md";
import { RxOpenInNewWindow } from "react-icons/rx";
import prismadb from "@/lib/prismadb";
import { deleteTest, deleteMaterials, deleteAssignments, testingDeleter } from "@/app/server/action";
import { useRouter }  from "next/navigation";
import PrivateRoute from "@/utils/PrivateRoute";
import { toast } from "react-hot-toast";
import {AiOutlinePlus} from "react-icons/ai";


const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

const TableView = ({ params, data }: { data: any, params: { slug: string } }) => {
    const router = useRouter()
    const [tableData, setTableData] = useState(data);
    const [isQuiz, setIsQuiz] = useState(params.slug.includes('quizes'))
    // console.log(params.slug)
    // console.log(data)

    const handleDelete = async (id: number) => {
        if (window.confirm('Do you want to delete this?')) {
            if (params.slug.includes('assignment')) {
                console.log("Deleting assignment:", await deleteAssignments(id));
            } else if (params.slug.includes('materials')) {
                console.log('Deleting material no.:', await deleteMaterials(id));
            } else if (params.slug.includes('quizes')) {
                console.log('Deleting quiz no.:', await deleteTest(id));
            }

            // Update the state to trigger a re-render
            setTableData((prevData: any) => prevData.filter((item: any) => item.id !== id));
            toast.success('deleted successfully. please wait for page to reload...')
            router.refresh()
        }
    }

    return (
            <Table>
                <TableCaption>A list of your {params.slug}.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">id</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((dat: any) => (
                        <TableRow key={dat.id}>
                            <TableCell className="font-medium">{dat.id}</TableCell>
                            <TableCell>{dat.title}</TableCell>
                            <TableCell>{timeAgoAndFormattedDate(dat.createdAt.toString()).ago}</TableCell>
                            <TableCell className="text-right flex gap-10 justify-end items-center">
                                <DialogBox icon={<RxOpenInNewWindow className="cursor-pointer text-blue-600 text-2xl" />} date={timeAgoAndFormattedDate(dat.createdAt.toString()).ago} data={dat} quiz={isQuiz}/>
                                <MdDelete onClick={() => handleDelete(dat.id)} className="cursor-pointer text-red-400 inline-block text-2xl" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}></TableCell>
                        <TableCell className="text-right"></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
    )
}

export default PrivateRoute(TableView)
