import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { userId: number } }) {
    try {
        // requesting data from frontend
        const body = await req.json();

        const { firstname, lastname, user_type, matric_no, course_code } = body;

        // checking if user is available
        if (!params.userId) {
            new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedUser = await prismadb.user.update({
            where: { id: params.userId },
            data: {
                firstName: firstname,
                lastName: lastname,
                role: user_type,
                matno: matric_no,
                course: {
                    create: {
                        title: course_code,
                    }
                },
            }});

        return NextResponse.json({
            success: true,
            data: updatedUser,
        });

    } catch (error) {
        console.log("[Users_Post]", error);
        return new NextResponse("Internal error", { status: 500 });
    }

}

export async function GET(req: Request) {
    try {
        const users = await prismadb.user.findMany();
        return NextResponse.json({
            users,
        });
    } catch (error) {
        console.log("[Users_Get]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
