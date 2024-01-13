import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { userId: string } }) {
    try {
        // requesting data from frontend
        const body = await req.json();

        const { firstname, lastname, user_type, matric_no, course_code } = body;

        // checking if user is available
        if (!params.userId) {
            new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedUser = await prismadb.user.update({
            where: { id: Number(params.userId) },
            data: {
                firstName: firstname,
                lastName: lastname,
                role: user_type,
                matno: matric_no,
                // course: {
                //     create: {
                //         title: course_code,
                //     }
                // },
            }});

        // Check if the course_code is provided
        if (course_code) {
            // Create a new course and associate it with the user
            const createdCourse = await prismadb.course.create({
                data: {
                    title: course_code,
                    createdBy: Number(params.userId),
                },
            });
        }

        return NextResponse.json({
            success: true,
            data: updatedUser,
        });

    } catch (error) {
        console.log("[Users_Post]", error);
        return new NextResponse("Internal error", { status: 500 });
    }

}

export async function GET(req: Request, { params }: { params?: { userId: number } }) {
    try {
        if(params?.userId) {
            const course = await prismadb.course.findUnique({
                where: {
                    createdBy: Number(params.userId),
                },
            })
            return NextResponse.json({
                course,
            })
        }

        if(!params?.userId) {
            const courses = await prismadb.course.findMany();
            return NextResponse.json({
                courses,
            });
        }
    } catch (error) {
        console.log("[Users_Get]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
