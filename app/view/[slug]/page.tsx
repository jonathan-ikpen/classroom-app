import TableView from "@/app/view/components/tableView";
import PrivateRoute from "@/utils/PrivateRoute";

import {getAssignments, getMaterials, getTests, deleteTest, deleteAssignments, deleteMaterials, testingActions} from "@/app/server/action";


const View = async ({ params, searchParams }: { params: { slug: string }, searchParams: { [key: string]: string | string[] | undefined } }) => {
    // console.log(params)
    // console.log(searchParams.id)

    const assignments = await getAssignments(Number(searchParams?.id))
    const materials = await getMaterials(Number(searchParams?.id))
    const tests = await getTests(Number(searchParams?.id))


    return  (
        <div className="w-full p-10 max-h-screen mt-24 flex flex-col gap-10 justify-center items-center">
            <h1 className={'text-3xl font-semibold'}>{params.slug[0].toUpperCase()+params.slug.slice(1)}</h1>
           <TableView params={params} data={params.slug == 'assignments' ? assignments : params.slug == 'materials' ? materials : params.slug == 'quizes' ? tests : ''}/>
        </div>

    )
}

export default View