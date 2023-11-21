"use client"
import TableView from "@/app/view/components/tableView";


export default function View({ params }: { params: { slug: string } }) {
    console.log(params)
    return (
        <div className="w-full max-h-screen mt-24 flex flex-col fjustify-center fitems-center">
           <TableView params={params}/>
        </div>

    )
}
