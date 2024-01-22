import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { user_id, content, assignment_id } = body;

        // Check if the user is enrolled in the course and has the necessary permissions

        // Assuming you have a user authentication system in place, validate the user's role and permissions here

        // Create the answer
        const createAnswer = await prismadb.answer.create({
            data: {
                content,
                userId: user_id,
                assignmentId: assignment_id,
            },
        });

        return NextResponse.json({
            success: true,
            data: createAnswer,
        });
    } catch (error) {
        console.log("[Answer_Post]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        // Assuming you have a user authentication system in place, validate the user's role and permissions here

        // Retrieve all answers
        const answers = await prismadb.answer.findMany();

        return NextResponse.json({
            answers,
        });
    } catch (error) {
        console.log("[Answer_Get]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
